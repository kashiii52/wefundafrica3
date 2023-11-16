from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser
from rest_framework import status
from .serializers import UserRegistrationSerializer, CustomUserSerializer
from django.contrib.auth import authenticate
import base64
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # Add custom claims to the token response
        # data['user_id'] = user.id
        data['email'] = user.email
        data['username'] = user.username
        data['phone_number'] = user.phone_number
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['years_in_business'] = user.years_in_business
        data['monthly_revenue'] = user.monthly_revenue

        data['image'] = user.image.url
        print(user.image.url)

        return data





class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token',
        '/token/refresh',
    ]
    return Response(routes)



@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data
            username = user_data['username']
            email = user_data['email']
            password = user_data['password']

            # Create the user without the image field for now
            user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password,
                phone_number=user_data.get('phone_number', ''),
                first_name=user_data.get('first_name', ''),
                last_name=user_data.get('last_name', ''),
            )

            # Upload the image to S3 if provided
            image = user_data.get('image')
            if image:
                s3 = boto3.client(
                    's3',
                    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
                )
                bucket_name = settings.AWS_STORAGE_BUCKET_NAME
                folder_key = f"user_folders/{username}/images/"

                try:
                    s3.head_object(Bucket=bucket_name, Key=folder_key)
                except Exception as e:
                    # The folder doesn't exist, create it
                    s3.put_object(Bucket=bucket_name, Key=folder_key)

                image_name = image.name.replace('.', '_')
                # image_key = f"user_folders/{username}/profile_image_{user.id}_{image.name}"
                image_key = f"user_folders/{username}/images/profile_image_{user.id}_{image_name}"


                # Upload the image to S3
                s3.upload_fileobj(image, bucket_name, image_key)

                # Update the user's image field with the S3 URL
                user.image = f"{bucket_name}/{image_key}"
                user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access this API
def get_user_details(request):
    user = request.user  # Get the authenticated user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated])  
def update_user_details(request):
    user = request.user

    serializer = CustomUserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()  # Save the updated user details
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





import io
import boto3
from botocore.exceptions import NoCredentialsError

# def upload_to_s3(file, file_name):
#     s3 = boto3.client('s3')
#     try:
#         s3.upload_fileobj(file, 'your-s3-bucket-name', file_name)
#         return True
#     except NoCredentialsError:
#         return False




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])  
# def FileUploadView(request, format=None):
#     try:
#         user = request.user
#         session_s3 = boto3.session.Session(region_name='us-east-1',
#                                     aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#                                     aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
#         s3 = session_s3.client('s3')
#         for index, uploaded_file in enumerate(request.FILES.values()):
#             file_extension = uploaded_file.name.split('.')[-1]

#             # file_name = f"user_folders/{user.username}/file_{index}.{file_extension}"
#             custom_filename = request.POST.get(f'filename{index}')
#             file_name = f"user_folders/{user.username}/{custom_filename}.{file_extension}"
            # file_name = f"user_folders/{user.username}/{key}.{file_extension}"

#             # Upload the binary data to S3
#             s3.upload_fileobj(uploaded_file, settings.AWS_STORAGE_BUCKET_NAME, file_name)

#         return Response({"message": "Files uploaded successfully"}, status=status.HTTP_201_CREATED)

#     except NoCredentialsError:
#         return Response({"message": "AWS credentials are not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#     except Exception as e:
#         print(str(e))
#         return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def FileUploadView(request, format=None):
    try:
        user = request.user
        session_s3 = boto3.session.Session(region_name='us-east-1',
                                    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        s3 = session_s3.client('s3')
        for key, uploaded_file in request.FILES.items():
            file_extension = uploaded_file.name.split('.')[-1]

            # Use the key (e.g., "Business Registration document") as the S3 object key
            file_name = f"user_folders/{user.username}/{key}.{file_extension}"

            # Upload the binary data to S3
            s3.upload_fileobj(uploaded_file, settings.AWS_STORAGE_BUCKET_NAME, file_name)

        return Response({"message": "Files uploaded successfully"}, status=status.HTTP_201_CREATED)

    except NoCredentialsError:
        return Response({"message": "AWS credentials are not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        print(str(e))
        return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ListUploadedFilesView(request, format=None):
    try:
        user = request.user
        session_s3 = boto3.session.Session(
            region_name='us-east-1',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        s3 = session_s3.client('s3')

        # List objects in the user's folder
        user_folder_prefix = f"user_folders/{user.username}/"
        response = s3.list_objects_v2(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME,
            Prefix=user_folder_prefix
        )

        # Extract file names from the response
        file_names = [obj['Key'].replace(user_folder_prefix, '') for obj in response.get('Contents', [])]

        # Filter out empty strings
        file_names = [file_name for file_name in file_names if file_name]

        # Initialize a dictionary to store file content
        file_contents = {}

        # Retrieve and read each file
        for file_name in file_names:
            file_key = f"{user_folder_prefix}{file_name}"
            try:
                # Get the file content from S3 as bytes
                file_obj = s3.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_key)
                file_content = file_obj['Body'].read()
                # Encode the file content in base64
                file_content_base64 = base64.b64encode(file_content).decode('utf-8')
                file_contents[file_name] = file_content_base64
            except Exception as e:
                # Handle any errors that occur while reading the file
                return Response({"message": f"An error occurred while reading '{file_name}': {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"files": file_contents}, status=status.HTTP_200_OK)

    except NoCredentialsError:
        return Response({"message": "AWS credentials are not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





from .serializers import ImageSerializer

# class RetrieveImageView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, username):
#         try:
#             # Fetch the user object from the database based on the username
#             user = CustomUser.objects.get(username=username)
#         except CustomUser.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
#         # Initialize Boto3 client with AWS credentials from settings
#         s3 = boto3.client(
#             's3',
#             aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
#             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
#         )
        
#         # Construct the S3 image URL based on the retrieved user's data
#         s3_image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{user.image.name}"

#         # Create a serializer instance with the image URL
#         serializer = ImageSerializer({'image_url': s3_image_url})
        
#         return Response(serializer.data, status=status.HTTP_200_OK)






class RetrieveImageView(APIView):
    def get(self, request, username):
        try:
            # Initialize the AWS S3 session and client
            session_s3 = boto3.session.Session(
                region_name='us-east-1',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
            )
            s3 = session_s3.client('s3')

            # Construct the S3 prefix for the user's images
            user_image_prefix = f"user_folders/{username}/images/"

            # List objects in the user's folder
            response = s3.list_objects_v2(
                Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                Prefix=user_image_prefix
            )

            # Extract file names from the response
            file_names = [obj['Key'].replace(user_image_prefix, '') for obj in response.get('Contents', [])]

            # Filter out empty strings
            file_names = [file_name for file_name in file_names if file_name]

            # Initialize a dictionary to store file content
            file_contents = {}

            # Retrieve and read each file
            for file_name in file_names:
                image_key = f"{user_image_prefix}{file_name}"
                try:
                    # Get the image content from S3 as bytes
                    image_obj = s3.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=image_key)
                    image_content = image_obj['Body'].read()

                    # Encode the image content in base64
                    image_content_base64 = base64.b64encode(image_content).decode('utf-8')

                    # Store the image content in the dictionary with the file name as the key
                    file_contents[file_name] = image_content_base64
                except Exception as e:
                    # Handle any errors that occur while reading the file
                    return Response({"message": f"An error occurred while reading '{file_name}': {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"images": file_contents}, status=status.HTTP_200_OK)

        except NoCredentialsError:
            return Response({"message": "AWS credentials are not configured."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)