// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { changePassword } from "../../Redux/Slices/AuthSlice"; // सुनिश्चित करें कि आप सही फ़ाइल पथ का उपयोग कर रहे हैं
// import HomeLayout from "../../Layouts/HomeLayout";

// function ChangePassword() {
//     const dispatch = useDispatch();
//     const [data, setData] = useState({
//         oldPassword: "",
//         newPassword: "",
//     });

//     function handleInputChange(e) {
//         const { name, value } = e.target;
//         setData({
//             ...data,
//             [name]: value,
//         });
//     }

//     async function onFormSubmit(e) {
//         e.preventDefault();
//         if (!data.oldPassword || !data.newPassword) {
//             toast.error("All fields are mandatory");
//             return;
//         }
    
//         try {
//             // Redux dispatch for changing password
//             const resultAction = await dispatch(changePassword(data));
//             if (changePassword.fulfilled.match(resultAction)) {
//                 toast.success("Password changed successfully");
//             } else {
//                 toast.error(resultAction.payload || "Failed to change password");
//             }
//         } catch (error) {
//             console.error("Password change failed:", error);
//         }
//     }
    

//     return (
//         <HomeLayout>
//             <div className="flex items-center justify-center h-[100vh]">
//                 <form
//                     onSubmit={onFormSubmit}
//                     className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
//                 >
//                     <h1 className="text-center text-2xl font-semibold">Change Password</h1>
//                     <div className="flex flex-col gap-1">
//                         <label htmlFor="oldPassword" className="text-lg font-semibold">Old Password</label>
//                         <input 
//                             required
//                             type="password"
//                             name="oldPassword"
//                             id="oldPassword"
//                             placeholder="Enter your old password"
//                             className="bg-transparent px-2 py-1 border"
//                             value={data.oldPassword}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1">
//                         <label htmlFor="newPassword" className="text-lg font-semibold">New Password</label>
//                         <input 
//                             required
//                             type="password"
//                             name="newPassword"
//                             id="newPassword"
//                             placeholder="Enter your new password"
//                             className="bg-transparent px-2 py-1 border"
//                             value={data.newPassword}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
//                         Change Password
//                     </button>
//                 </form>
//             </div>
//         </HomeLayout>
//     );
// }

// export default ChangePassword;


import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { changePassword } from "../../Redux/Slices/AuthSlice"; // Ensure correct file path

function ChangePassword() {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        // Frontend validation: Ensure both fields are filled
        if (!data.oldPassword || !data.newPassword) {
            toast.error("Both fields are mandatory");
            return;
        }

        try {
            // Dispatch the changePassword action to Redux
            const resultAction = await dispatch(changePassword(data));
            if (changePassword.fulfilled.match(resultAction)) {
                toast.success("Password changed successfully");
            } else {
                toast.error(resultAction.payload || "Failed to change password");
            }
        } catch (error) {
            console.error("Password change failed:", error);
        }
    }

    return (
        <div className="flex items-center justify-center h-[100vh]">
            <form onSubmit={onFormSubmit} className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
                <h1 className="text-center text-2xl font-semibold">Change Password</h1>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="oldPassword" className="text-lg font-semibold">Old Password</label>
                    <input 
                        required
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter your old password"
                        className="bg-transparent px-2 py-1 border"
                        value={data.oldPassword}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="newPassword" className="text-lg font-semibold">New Password</label>
                    <input 
                        required
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter your new password"
                        className="bg-transparent px-2 py-1 border"
                        value={data.newPassword}
                        onChange={handleInputChange}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
