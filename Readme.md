# Backend Project (Similar to YouTube)

## Project Description
This project is a backend implementation of a YouTube-like platform. It provides APIs for user management, video uploads, subscriptions, and other features required for a video-sharing platform. The backend is built using Node.js and Express, with MongoDB as the database.

### Key Features
- **User Management:**
  - User registration, login, and logout.
  - Profile updates, including avatar and cover image uploads.
  - Password management and token-based authentication.

- **Video Management:**
  - Uploading and managing video files and thumbnails.
  - Storing video metadata such as title, description, duration, and views.
  - Support for publishing and unpublishing videos.

- **Subscription System:**
  - Users can subscribe to other channels.
  - Manage subscriptions and fetch channel profiles.

- **Watch History:**
  - Track and fetch the watch history of users.

### Technologies Used
- **Backend Framework:** Node.js with Express.
- **Database:** MongoDB.
- **Authentication:** JSON Web Tokens (JWT).
- **File Uploads:** Multer for handling file uploads and Cloudinary for cloud storage.
- **Utilities:** Custom error handling, API response standardization, and async handler utilities.

### Use Cases
- A platform for users to upload, share, and manage videos.
- A subscription-based system to follow channels and receive updates.
- A history tracking system to keep track of watched videos.

This project serves as a foundation for building a full-fledged video-sharing platform.

## API Endpoints Documentation

### 1. User Registration
**Endpoint:** `/register`
- **Method:** POST
- **Description:** Registers a new user with the provided details and uploads avatar and cover images to Cloudinary.
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "email": "string",
    "username": "string",
    "password": "string"
  }
  ```
- **Files:**
  - `avatar` (required): Image file for the user's avatar.
  - `coverImage` (optional): Image file for the user's cover image.
- **Response:**
  - **201 Created:** User registered successfully.
  - **400 Bad Request:** Validation errors or missing required fields.
  - **500 Internal Server Error:** Server error.

### 2. User Login
**Endpoint:** `/login`
- **Method:** POST
- **Description:** Logs in a user and generates access and refresh tokens.
- **Request Body:**
  ```json
  {
    "email": "string" (optional),
    "username": "string" (optional),
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** User logged in successfully with tokens.
  - **400 Bad Request:** Missing required fields.
  - **401 Unauthorized:** Invalid credentials.
  - **500 Internal Server Error:** Server error.

### 3. User Logout
**Endpoint:** `/logout`
- **Method:** POST
- **Description:** Logs out the user and clears tokens from cookies.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Response:**
  - **200 OK:** User logged out successfully.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 4. Refresh Access Token
**Endpoint:** `/refresh-Token`
- **Method:** POST
- **Description:** Refreshes the access token using the refresh token.
- **Request Body:**
  ```json
  {
    "refreshToken": "string"
  }
  ```
- **Response:**
  - **200 OK:** New access token generated.
  - **400 Bad Request:** Missing or invalid refresh token.
  - **500 Internal Server Error:** Server error.

### 5. Change Password
**Endpoint:** `/change-password`
- **Method:** POST
- **Description:** Changes the current user's password.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Request Body:**
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **Response:**
  - **200 OK:** Password changed successfully.
  - **400 Bad Request:** Validation errors or missing fields.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 6. Get Current User
**Endpoint:** `/current-user`
- **Method:** GET
- **Description:** Fetches the details of the currently logged-in user.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Response:**
  - **200 OK:** User details fetched successfully.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 7. Update Account Details
**Endpoint:** `/update-account`
- **Method:** PATCH
- **Description:** Updates the full name and email of the currently logged-in user.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "email": "string"
  }
  ```
- **Response:**
  - **200 OK:** Account details updated successfully.
  - **400 Bad Request:** Validation errors or missing fields.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 8. Update User Avatar
**Endpoint:** `/avatar`
- **Method:** PATCH
- **Description:** Updates the avatar image of the currently logged-in user.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Files:**
  - `avatar` (required): Image file for the user's avatar.
- **Response:**
  - **200 OK:** Avatar updated successfully.
  - **400 Bad Request:** Missing or invalid file.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 9. Update User Cover Image
**Endpoint:** `/cover-image`
- **Method:** PATCH
- **Description:** Updates the cover image of the currently logged-in user.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Files:**
  - `coverImage` (required): Image file for the user's cover image.
- **Response:**
  - **200 OK:** Cover image updated successfully.
  - **400 Bad Request:** Missing or invalid file.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 10. Get User Channel Profile
**Endpoint:** `/c/c:username`
- **Method:** GET
- **Description:** Fetches the channel profile of a user by their username.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Parameters:**
  - `username` (required): The username of the user whose channel profile is being fetched.
- **Response:**
  - **200 OK:** Channel profile fetched successfully.
  - **400 Bad Request:** Missing or invalid username.
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

### 11. Get Watched History
**Endpoint:** `/history`
- **Method:** GET
- **Description:** Fetches the watch history of the currently logged-in user, including the list of videos the user has watched.
- **Headers:**
  - `Authorization`: Bearer token (required)
- **Response:**
  - **200 OK:** Watch history fetched successfully.
    ```json
    {
      "success": true,
      "data": [
        {
          "videoId": "string",
          "title": "string",
          "watchedAt": "timestamp"
        }
      ],
      "message": "Watch history fetched successfully"
    }
    ```
  - **401 Unauthorized:** Invalid or missing token.
  - **500 Internal Server Error:** Server error.

## Additional Documentation

### Application Setup
- **File:** `src/app.js`
- **Description:**
  - Sets up the Express application with middleware for CORS, JSON parsing, URL encoding, static file serving, and cookie parsing.
  - Imports and uses the `user.routes.js` for handling user-related API endpoints.
  - Base route: `/api/v1/users`

### Database Connection
- **File:** `src/index.js`
- **Description:**
  - Connects to MongoDB using the `connectDB` function.
  - Starts the Express server on the specified port.

### Constants
- **File:** `src/constant.js`
- **Description:**
  - Contains the constant `DB_NAME` which specifies the database name as `videotube`.

### User Controller
- **File:** `src/controllers/user.controller.js`
- **Description:**
  - Contains logic for user-related operations such as registration, login, logout, token refresh, password change, and profile updates.
  - Key functions:
    - `registerUser`: Handles user registration.
    - `loginUser`: Authenticates a user and generates tokens.
    - `logoutUser`: Logs out a user and clears tokens.
    - `refreshAccessToken`: Refreshes the access token.
    - `changeCurrentPassword`: Allows a user to change their password.
    - `getCurrentUser`: Fetches the currently logged-in user's details.
    - `updateAccountDetails`: Updates user account details.
    - `updateUserAvatar`: Updates the user's avatar.
    - `updateUserCoverImage`: Updates the user's cover image.

### Authentication Middleware
- **File:** `src/middlewares/auth.middleware.js`
- **Description:**
  - Middleware to verify JSON Web Tokens (JWT) for protected routes.
  - Function: `verifyJWT`

### File Upload Middleware
- **File:** `src/middlewares/multer.middleware.js`
- **Description:**
  - Configures `multer` for handling file uploads.
  - Stores files in the `public/temp` directory with unique filenames.

### Subscription Model
- **File:** `src/models/subscription.model.js`
- **Description:**
  - Defines the `Subscription` schema for managing user subscriptions.
  - Fields:
    - `subscriber`: Reference to the subscribing user.
    - `channel`: Reference to the subscribed channel.

### Video Model
- **File:** `src/models/videos.model.js`
- **Description:**
  - Defines the `Video` schema for managing video uploads.
  - Fields:
    - `videoFile`: URL of the video file.
    - `thumbnail`: URL of the video thumbnail.
    - `owner`: Reference to the user who uploaded the video.
    - `title`: Title of the video.
    - `description`: Description of the video.
    - `duration`: Duration of the video in seconds.
    - `views`: Number of views.
    - `isPublished`: Boolean indicating if the video is published.

### User Routes
- **File:** `src/routes/user.routes.js`
- **Description:**
  - Defines routes for user-related operations.
  - Routes:
    - `/register`: POST - User registration.
    - `/login`: POST - User login.
    - `/logout`: POST - User logout (protected).
    - `/refresh-Token`: POST - Refresh access token.
    - `/change-password`: POST - Change password (protected).
    - `/current-user`: GET - Get current user details (protected).
    - `/update-account`: PATCH - Update account details (protected).
    - `/avatar`: PATCH - Update avatar (protected).
    - `/cover-image`: PATCH - Update cover image (protected).
    - `/c/c:username`: GET - Get user channel profile (protected).

### Utility Classes
- **File:** `src/utils/ApiError.js`
- **Description:**
  - Custom error class for handling API errors.
  - Fields:
    - `statusCode`: HTTP status code.
    - `message`: Error message.
    - `errors`: Additional error details.

- **File:** `src/utils/ApiResponse.js`
- **Description:**
  - Utility for standardizing API responses.

- **File:** `src/utils/asyncHandler.js`
- **Description:**
  - Utility for handling asynchronous route handlers and catching errors.

- **File:** `src/utils/cloudinary.js`
- **Description:**
  - Utility for uploading files to Cloudinary.