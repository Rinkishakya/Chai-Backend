import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import fs from "fs"; // search brower file system

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // jpeg, png mp4, etc.
        })

        // file has beed uploaded successfully
        console.log(" file is uploaded on cloudinary", 
        result.url);
        return result;

    } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the filw locally saved temporary file as the upload operation got failed
        return null;
    }
};

export default uploadOnCloudinary;

 
