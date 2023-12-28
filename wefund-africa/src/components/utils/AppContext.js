import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toBeChecked } from "@testing-library/jest-dom/matchers";

const AppContext = createContext();

export default AppContext;

export const Provider = ({ children }) => {

  let [tokensToStore, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const backendRoot =
    // "http://54.236.11.151";
    "http://127.0.0.1:8000";
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );


  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [authloader, setAuthloader] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [tokens, setTokens] = useState(null);

  const [userDetail, setUserDetail] = useState(() => {
    const storedUserDetail = localStorage.getItem("userDetail");
    return storedUserDetail ? JSON.parse(storedUserDetail) : null;
  });
  // let tokensToStore;


  let loginUser = async (e) => {
    e.preventDefault();

    if (!authloader) {
      setAuthloader(true);
      console.log("click on login")
      let response = await fetch(`${backendRoot}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      console.log("not login")

      let data = await response.json();
      if (response.status === 200) {
        setAuthloader(false);

        tokensToStore = {
          access: data.access,
          refresh: data.refresh,
        };
        setUserDetail({
          username: data.username,
          email: data.email,
          phone_number: data.phone_number,
          first_name: data.first_name,
          last_name: data.last_name,
          image: data.image,
          years_in_business: data.years_in_business,
          monthly_revenue: data.monthly_revenue,
        });
        
        localStorage.setItem("authTokens", JSON.stringify(tokensToStore));
        setUser(jwt_decode(tokensToStore.access));
        navigate("/user/dashboard");

      } else {
        alert("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
    }
  }, [userDetail]);



  let logoutUser = () => {
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userDetail");
    navigate("/login");
  };



  let updateToken = async () => {
    try {
      let response = await fetch(`${backendRoot}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: tokensToStore?.refresh }),
      });
      let data = await response.json();
      console.log("refresh", data)
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        tokensToStore = { access: data.access, refresh: data.refresh };
        localStorage.setItem("authTokens", JSON.stringify(tokensToStore));
      } else {
        console.error("Error refreshing token. Server response:", data);
  
        if (data.code === "token_not_valid") {
          console.error("Token not valid (blacklisted). Logging out.");
        }
  
        // logoutUser();
        navigate('/login');
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutUser();
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  };
  

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authloader: authloader,
    setAuthloader: setAuthloader,
    userDetail: userDetail,
    setUserDetail: setUserDetail,
    tokensToStore: tokensToStore,
  };


  // useEffect(() => {
  //   if (loading && tokensToStore) {
  //     updateToken();
  //   }
  
  //   let fourMinutes = 1000 * 60 * 4;
  //   let interval = setInterval(() => {
  //     if (tokensToStore) {
  //       updateToken();
  //     }
  //   }, fourMinutes);
  
  //   return () => clearInterval(interval);
  // }, [tokensToStore, loading]);




  useEffect(() => {
    // Check if the user is logged in before attempting to update the token
    if (loading && tokensToStore) {
      updateToken();
  
      // Set up an interval for token refresh
      let fourMinutes = 1000 * 60 * 4;
      let interval = setInterval(() => {
        updateToken();
      }, fourMinutes);
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [tokensToStore, loading]);


  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
    // <AppContext.Provider value={contextData}>
    //   {loading ? null : children}
    // </AppContext.Provider>
  );
};
