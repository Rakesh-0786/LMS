import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const cookieOptions= {
    maxAge:7*24*60*60*1000,  //7 days
    httpOnly:true,
    secure:true
}

const register= async (req,res,next) =>{
    const{fullName, email, password}=req.body;

    if(!fullName || !email || !password){
        return next(new AppError("All fields are required", 400));
    }
    const userExists= await User.findOne({email});
    
    // if user exits
    if(userExists) {
        return next(new AppError("Email already exists",400));
    }

    // if user doesnot exists then create that user
    // there are two steps for creating user
    // first save the basic user information in the database.
    // secondely first upload the user profile on the third party and if finally uploaded then save it .
     const user =await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
     });

     if(!user){
        return next (new AppError('User registration failed, please try again',400));

     }


    //  TODO :File upload
    console.log('File-Details >', JSON.stringify(req.file));
   if(req.file){
    try{
        const result= await cloudinary.v2.uploader.upload(req.file.path, {
            folder:"EduSphere",
            width:450,
            height:450,
            gravity:'faces',
            crop:'fill'
        });

        if(result) {
            user.avatar.public_id=result.public_id;
            user.avatar.secure_url=result.secure_url;

            // Remove file from server
            fs.rm(`uploads/${req.file.filename}`)
        }
    } catch(e) {
         return next (
            new AppError(error || 'File not uploaded, please try again',500)
         )
      }
   }

    await user.save();

    user.password=undefined;

    // if the user are registered then direcly login that user through jwtToken and store token into cookie.
    const token= await user.generateJWTToken();
    
    res.cookie('token', token, cookieOptions)

    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user,
    });
};

const login = async (req,res,next)=>{
    try{
        const {email, password}=req.body;

        if(!email || !password) {
            return next(new AppError('All fields are required',400));
        }
    
        const user= await User.findOne({
            email
        }).select('+password');  // .select('+password') is used in Mongoose to explicitly include the password 
        
        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or password does not match', 400))
        }
         
        // await user.save();

        const token= await user.generateJWTToken();
        user.password=undefined;

        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success:true,
            message:'User loggedin successfully',
            user,
        });
    } catch(e){
        return next (new AppError(e.message, 500));
    }
};

const logout=(req,res) =>{
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
};

const getProfile=async (req,res,next) =>{
    try{
        const userId = req.user.id;
        const user= await User.findById(userId);
        
        res.status(200).json({
            success:true,
            message:"User details",
            user
        });
    }catch(e){
        return next(new AppError('Failed to fetch profile details', 500));
    }
}
// forgot password:-
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
  
    if (!email) {
      return next(new AppError("Email not registered", 400));
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Email not registered", 400));
    }
  
    const resetToken = user.generatePasswordResetToken();
  
    await user.save();
    // console.log('Generated Reset Token:', resetToken);
  
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
    console.log("ResetPassword-Url->", resetPasswordUrl);
  
    // send email
    const subject = "Reset Password";
    const message = `You can reset your passsword by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password<a/>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n if you have not requested this , kindly ignore.`;
  
    try {
      await sendEmail(email, subject, message);
      res.status(200).json({
        success: true,
        message: `Reset password token has been sent to ${email} successfully`,
      });
    } catch (e) {
      user.forgotPasswordExpiry = undefined;
      user.forgotPasswordToken = undefined;
  
      await user.save();
      return next(new AppError(e.message, 500));
    }
  };


// Reset password
  const resetPassword = async (req, res, next) => {
    try {
      const { resetToken } = req.params;  
      const { password } = req.body;
      console.log("Received password reset request:", { resetToken, password });

  
      // const forgotPasswordToken=crypto
      // .createHash('sha256')
      // .update(resetToken)
      // .digest('hex');
  
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      // console.log('Hashed Token:', hashedToken);
  
      const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() },
      });
  
      // if user doent not found
      if (!user) {
        return next(
          new AppError("Token is invalid or expired, please try again", 400)
        );
      }
      // incase if user found
      user.password = password;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;
      user.save();
  
      res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  };


// //   change password
// const changePassword = async (req, res, next) => {
//   const { oldPassword, newPassword } = req.body;
//   const { id } = req.user;
//   console.log("User ID:", id);
//   console.log("Old Password from Request:", oldPassword);

//   if (!oldPassword || !newPassword) {
//       return next(new AppError("All fields are mandatory", 400));
//   }

//   const user = await User.findById(id).select("+password");

//   if (!user) {
//       return next(new AppError("User does not exist", 400));
//   }

//   const isPasswordValid = await user.comparePassword(oldPassword);
//   console.log("Is Password Valid:", isPasswordValid);
//   console.log("User Stored Password Hash:", user.password); // Log the stored password

//   if (!isPasswordValid) {
//       return next(new AppError("Invalid old Password", 400));
//   }
// //   if (!(bcrypt.compareSync(oldPassword, user.password))) {
// //     return next(new AppError("Invalid Old Password", 400));
// // }

//   user.password = newPassword;
//   await user.save();

//   // user.password = undefined; // Remove the password field before sending the response

//   res.status(200).json({
//       success: true,
//       message: "Password changed successfully!",
//   });
// };



// Change password
const changePassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.user;  // The authenticated user's ID
  
      // Check if both fields are provided
      if (!oldPassword || !newPassword) {
        return next(new AppError("Both old and new passwords are required", 400));
      }
  
      // Find the user by ID and include the password field
      const user = await User.findById(id).select("+password");
  
      if (!user) {
        return next(new AppError("User not found", 404));
      }
  
      // Check if the old password is correct
      const isPasswordValid = await user.comparePassword(oldPassword);
  
      if (!isPasswordValid) {
        return next(new AppError("Incorrect old password", 400));
      }
  
      // Ensure the new password is not the same as the old one
      if (oldPassword === newPassword) {
        return next(new AppError("New password cannot be the same as old password", 400));
      }
  
      // Update the user's password
      user.password = newPassword;
      await user.save();  // This will trigger the pre-save middleware to hash the password
  
      res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
    } catch (error) {
      next(error);
    }
  };
  



//   updateUser 

//   const updateUser = async (req, res, next) => {
//     const { fullName } = req.body;
//     const { id } = req.user.id;
  
//     const user = await User.findById(id);
  
//     if (!user) {
//       return next(new AppError("User does not exist", 400));
//     }
  
//     if (req.fullName) {
//       user.fullName = fullName;
//     }
  
//     if (req.file) {
//       await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
//       try {
//         const result = await cloudinary.v2.uploader.upload(req.file.path, {
//           folder: "EduSphere",
//           width: 450,
//           height: 450,
//           gravity: "faces",
//           crop: "fill",
//         });
  
//         if (result) {
//           user.avatar.public_id = result.public_id;
//           user.avatar.secure_url = result.secure_url;
  
//           // Remove file from server
//           fs.rm(`uploads/${req.file.filename}`);
//         }
//       } catch (e) {
//         return next(
//           new AppError(error || "File not uploaded, please try again", 500)
//         );
//       }
//     }
  
//     await user.save();
  
//     res.status(200).json({
//       success: true,
//       message: "User details updated successfully!",
//     });
//   };



// Updated User 
const updateUser = async (req, res, next) => {
    try {
        const { fullName } = req.body;
        const { id } = req.user; // Destructure `id` directly from `req.user`

        const user = await User.findById(id);

        if (!user) {
            return next(new AppError("User does not exist", 400));
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (req.file) {
            // Delete the old avatar from Cloudinary
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "EduSphere",
                    width: 450,
                    height: 450,
                    gravity: "faces",
                    crop: "fill",
                });

                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    // Remove the uploaded file from the server
                    await fs.rm(`uploads/${req.file.filename}`);
                }
            } catch (error) {
                return next(new AppError(error.message || "File not uploaded, please try again", 500));
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User details updated successfully!",
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

  
export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}




