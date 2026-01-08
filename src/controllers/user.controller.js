import asynHandler from "../utils/asynHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import uploadOnCloudinary from "../utils/fileUpload.js";
import ApiResponse from "../utils/apiResponse.js";


const registerUser = asynHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    });
});

const login = asynHandler(async (req, res) => {
//   res.status(200).json({
//     message: "Login successfully"
//   });


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
if(
    [fullname, username, email, password].some((field) => field?.trim() === "")
)
{
    throw new apiError(400, "All fields are required");
}

// check if user already exists: username or email
const existingUser = User.findOne({
    $or: [{ email }, { username }]

})

if (existingUser) {
    throw new apiError(409, "User already exists with this email or username");
}

// check the image,
const avtarLocalPath = req.files?.avtar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

//  check for avtar
if (!avtarLocalPath) {
    throw new apiError(400, "Avtar is required");
}

//upload avtar to cloudinary
 const avtar = await uploadOnCloudinary(avtarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avtar) {
    throw new apiError(400, "Avtar upload failed, try again later");  
}

// create the object - create entery in db
 const user = await User.create({
    username: username.toLowerCase(),
    password,   
    fullname,
    email,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
})


const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new apiError(500, "User creation failed, try again later");
}

});







export default { 
    registerUser, 
    login 
};

// export default registerUser;
