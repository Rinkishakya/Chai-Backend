import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
username: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {    
        type: String,
        required: true,
        unique: true,   
        trim: true,
        lowercase: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avtarUrl: {
        type: String, //cloudinary url
        required: true
    },

    coverImageUrl: {
        type: String, //cloudinary url
        
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }
},
 {
    timestamps: true
}
)
// Hash password before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) 
        return next();

        this.password =  bcrypt.hash(this.password, 10);
        next()
    
})

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = function () {
 return jwt.sign(
        {
            _id: this._id,  
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )   
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,  
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}



export const User = mongoose.model("User", userSchema);