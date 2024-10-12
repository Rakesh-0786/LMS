import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"
const initialState ={
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        // console.log(res);
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return  (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
                console.log("Logout response:", res);

        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return (await res).data;
    } catch(error) {
                console.error("Logout error:", error);

        toast.error(error?.response?.data?.message);
    }
});


// export const logout = createAsyncThunk("/auth/logout", async () => {
//     try {
//         const res = await axiosInstance.post("user/logout");

//         // Check and log the response structure
//         console.log("Logout response:", res);

//         // Show a toast for success or fallback message
//         toast.success(res?.data?.message || "Logout successful");

//         return res.data; // Ensure correct data is returned
//     } catch (error) {
//         // Log the error for better debugging
//         console.error("Logout error:", error);

//         // Show a toast for the error with a fallback message
//         toast.error(error?.response?.data?.message || "Failed to log out");

//         throw error; // Re-throw the error if needed for further handling
//     }
// });


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
});

// export const {}= authSlice.actions;
export default authSlice.reducer;





