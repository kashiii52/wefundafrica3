import React, { useState, useContext, useEffect } from 'react';
import './FileUpload.css';
import AppContext from '../utils/AppContext';
import axios from 'axios';
import { MdCloudUpload } from 'react-icons/md'; 
import { json, useNavigate } from 'react-router-dom';

function FileUpload() {
  const { tokensToStore } = useContext(AppContext);
  const [files, setFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState(new Array(8).fill(null));
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedFileIndex, setSelectedFileIndex] = useState(null);



  const [isFilesLoaded, setIsFilesLoaded] = useState(false); // Add a state to track file loading
  const [isLoading, setIsLoading] = useState(true);




  const customFilenames = [
    'Director ID documents',
    '3 to 6 months bank statements',
    'PO document',
    'CSD Registration Document',
    'Business Registration document',
    'Tax Clearance Certificate',
    'Supplier invoice',
    'Supporting Documents',
  ];

  const navigate = useNavigate();
  const backendRoot = 
  // 'http://54.236.11.151';
  "http://127.0.0.1:8000";

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
    axios
      .get(`${backendRoot}/api/read-files/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setFiles(response.data.files);
        // console.log("files",response.data.files)


        setIsFilesLoaded(true);
        setIsLoading(false);
        console.log("User Detail:", JSON.parse(localStorage.getItem('userDetail')));

      })
      .catch((error) => {
        console.error('Error fetching files:', error);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('userDetail');
        navigate('/login');
      });
  }, []);

  const getMatchingFiles = () => {
    const names = Object.keys(files);
    const matchingFilenames = customFilenames.map(customFilename => {
      const matchingFilename = names.find(filename => filename.includes(customFilename));
      return matchingFilename ? matchingFilename : null;
    });
    // console.log("matching:", matchingFilenames)
    return matchingFilenames;
    };

  const renderCards = () => {
      const isFilesLoaded = Object.keys(files).length > 0;

      const isLoadingFile = (index) => {
        return !isFilesLoaded && selectedFileIndex === index;
      };
      
      
      return customFilenames.map((customFilename, index) => {
        const fileName = getMatchingFiles()[index];
        const isFileAvailable = !!files[fileName];
        
        return (
          <div>
          {isLoading ? (
            <span className="loader" />
        ) : (
          <div
            className={`file_upload_internal_div card-drop-zone ${selectedFileIndex === index ? 'highlighted' : ''}`}
            key={index}
            onClick={() => handleCardClick(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            {isFilesLoaded ? (
              isFileAvailable ? (
                <li key={fileName}>
                  <a
                    href={`data:application/octet-stream;base64,${files[fileName]}`}
                    download={fileName}
                  >
                    {customFilenames[index]}
                  </a>
                </li>
                ) : (
                  <>
                    {isLoadingFile(index) ? (
                        <div className="loader" />
              ) : (
                <>
                  <MdCloudUpload className='upload_icon' />
                  <p className='static_text'>
                    Drag and Drop File <span className="required">*</span>
                  </p>
                  <div className='choose_file_div'>
                    {selectedFiles[index] ? (
                      <p className='file_name'>{selectedFiles[index].name}</p>
                    ) : (
                      <p className='file_name'>No chosen file</p>
                    )}
                  </div>
                  <p className='custom_filename'>{customFilenames[index]}</p>
                  <input
                    type="file"
                    id={`fileInput-${index}`}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, index)}
                    disabled={isFileAvailable}
                  />
                </>
          )}
            </>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
        </div>
        );
      });
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = file;
    setSelectedFiles(newSelectedFiles);
    setSelectedFileIndex(index); 
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = file;
    setSelectedFiles(newSelectedFiles);
    setSelectedFileIndex(index);
  };

  const handleCardClick = (index) => {
    const fileInput = document.getElementById(`fileInput-${index}`);
    if (fileInput) {
      fileInput.click();
    }
    setSelectedFileIndex(index);
  };

  const uploadFiles = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

      const formData = new FormData();
      customFilenames.forEach((customFilename, index) => {
        const file = selectedFiles[index];
        if (file) {
          formData.append(customFilename, file); // Use customFilename as the key
        }
      });

      await axios.post(`${backendRoot}/api/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(percentCompleted);
        },
      });

      setSelectedFiles(new Array(8).fill(null));
      setUploadStatus('Completed');
      setSelectedFileIndex(null);

      setTimeout(() => {
        setUploadStatus(null);
        setUploadProgress(0);
        window.location.reload();
      }, 2000);

      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
      localStorage.removeItem(tokensToStore);
    }
  };

  const renderUploadStatus = () => {
    if (uploadStatus === 'Completed') {
      return (
        <div className="upload-status completed">
          Upload Completed
          <button onClick={() => setUploadStatus(null)}>Close</button>
        </div>
      );
    } else if (uploadStatus === 'Error') {
      return (
        <div className="upload-status error">
          Error uploading files. Please try again.
          <button onClick={() => setUploadStatus(null)}>Close</button>
        </div>
      );
    } else if (uploadProgress > 0) {
      return (
        <div className="upload-status">
          Uploading...
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {isLoading ? (
          <span className="loader" />
      ) : (
        <div className="file_upload_master_div">
          <div className="dashboard_grid">
            {/* {isLoading ? renderCards() : <span className="loader" />} */}
            {isLoading ? <span className="loader" /> : renderCards()}

          </div>
          <div className="upload_button">
            <button onClick={uploadFiles}>Upload</button>
          </div>
          {renderUploadStatus()}
        </div>
      )}
    </div>
  );
}

export default FileUpload;

