import asynHandler from "../utils/asynHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import uploadOnCloudinary from "../utils/fileUpload.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt";



const registerUser = asynHandler(async (req, res) => {
//     res.status(200).json({
//         message: "ok api successfully"
//     });
// });




// get user deatails from frontend
// validation - not empty
// check if user already exists: username or email
// check the image, check for avtar
// create the object - create entery in db
// remove password and refresh token field from response
// check the user creation
// return response to frontend



// get user deatails from frontend
const { username, password, fullname, email } = req.body;
console.log("fullname:", fullname);

// if (email === "") {
//     throw new apiError(400, "Email is required")
// } // sbko alag alag check krna pdega

// validation - not empty
if( [fullname, username, email, password].some((field) => field?.trim() === ""))
{
    throw new apiError(400, "All fields are required");
}

// check if user already exists: username or email
const existingUser = await  User.findOne({
    $or: [{ email }, { username }]
    
});

if (existingUser) {
    throw new apiError(409, "User already exists with this email or username");
}

// check the image,
const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

 console.log("FILES:", req.files);


//  check for avtar
if (!avatarLocalPath) {
    throw new apiError(400, "Avtar is required");
}

//upload avtar to cloudinary
 const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

// console.log("AVATAR URL:", avatar.secure_url);


if(!avatar) {
    throw new apiError(400, "Avtar upload failed, try again later");  
}

 const hashedPassword = await bcrypt.hash(password, 10);

// create the object - create entery in db
 const user = await User.create({
    username: username.toLowerCase(),
    password: hashedPassword,
    fullname,
    email,
    avatar: avatar.secure_url,
    coverImage: coverImage?.secure_url || "",
});


const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
);

// console.log("CREATED USER:", createdUser.avatar);

// if (!createdUser) {
//     throw new apiError(500, "User creation failed, try again later");
// }

// api return response to frontend
  return res.status(201).json(
    new ApiResponse(201,  createdUser, "User registered successfully")
    );
});




// export  {registerUser};

 export default registerUser;
