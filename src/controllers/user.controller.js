import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    if (!accessToken) {
      console.error("Access token generation failed for user:", userId); // Log with user ID!
      throw new ApiError(500, "Failed to generate access token");
    }

    const refreshToken = user.generateRefreshToken();
    if (!refreshToken) {
      console.error("Refresh token generation failed for user:", userId); // Log with user ID!
      throw new ApiError(500, "Failed to generate refresh token");
    }

    user.refreshToken = refreshToken;
    try {
      await user.save({ validateBeforeSave: false }); // Consider removing this if possible
    } catch (dbError) {
      console.error("Error saving refresh token to database:", dbError);
      throw new ApiError(500, "Failed to save refresh token"); // More specific message
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessTokenAndRefreshToken:", error); // Crucial!
    throw new ApiError(500, "Something went wrong while generating tokens"); // Keep a general message
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //check for user creation

  //get users detail from frontend
  const { fullName, email, username, password } = req.body;
  console.log("body: ", fullName, username, email, password);

  //validation of user data-not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  //check user details if already exist:by username and email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "user with this email or username already exist");
  }

  //check for images,check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req.file &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0].path;
  }
  console.log("avatar local path: ", avatarLocalPath);

  if (!avatarLocalPath) {
    console.error("avatar local path in missing");
    throw new ApiError(400, "avatar file avatarLocalPath is required");
  }

  //if availabe then upload to cloudinary then check successful avatar uploaded on clpudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "avatar file is required");
  }

  //create user object
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username?.toLowerCase(),
  });

  //remove password and refresh token fiield from response

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check user account is created or not
  if (!createdUser) {
    throw new ApiError(500, "having problem in registration");
  }

  //return result otherwise return error
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, " registrated sucessfull"));
});

//login user

const loginUser = asyncHandler(async (req, res) => {
  //req body for data inputs
  const { email, username, password } = req.body;
  console.log("hiiii", email, username, password);
  //find of user:
  if (!(username || email)) {
    throw new ApiError(400, "username or email required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("isPasswordValid", isPasswordValid);
  //password check
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user crendential");
  }

  //generate both access and refresh token
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //send to secure cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "access token successful"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
