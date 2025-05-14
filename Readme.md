#Backend project(It is like you tube)

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