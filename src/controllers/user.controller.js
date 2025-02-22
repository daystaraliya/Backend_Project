import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //check for user creation

  //get users detail from frontend
  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  //validation of user data-not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  //check user details if already exist:by username and email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with this email or username already exist");
  }

  //check for images,check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
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
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
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
    .json(new ApiResponse(200, createdUser, " registrated succefull"));
});

export { registerUser };
