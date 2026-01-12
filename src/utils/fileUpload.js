import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
import fs from "fs"; // search brower file system

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

console.log("Cloudinary ENV check:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "NOT LOADED",
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload file to Cloudinary
        const fixedPath = localFilePath.replace(/\\/g, "/"); // to fix the windows backslash issue in file path
        const result = await cloudinary.uploader.upload(fixedPath, {
            resource_type: "auto", // jpeg, png mp4, etc.
        });

    fs.unlinkSync(localFilePath); // temp file delete
    return result;

  } catch (error) {
    console.error("Cloudinary Error:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export default uploadOnCloudinary;


