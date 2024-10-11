// import React from "react";
// import { FiMenu } from "react-icons/fi";
// import {useDispatch,useSelector} from 'react-redux'
// import { AiFillCloseCircle } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import { logout } from "../Redux/Slices/AuthSlice";

// function HomeLayout({ children }) {

//     const dispatch=useDispatch();
//     const naviagte=useNavigate();

//     // for checking if user is logged in
//     const isLoggedIn=useSelector((state) => state?.auth?.isLoggedIn);

//     // for displaying the options according to the role
//     const role=useSelector((state) => state?.auth?.role);

//     function changeWidth() {
//         const drawerSide = document.getElementsByClassName("drawer-side");
//         if (drawerSide.length > 0) {
//             drawerSide[0].style.width = 'auto';
//         }
//     }

//     function hideDrawer() {
//         const element = document.getElementsByClassName("drawer-toggle");
//         if (element.length > 0) {
//             element[0].checked = false;
//         }
//         const drawerSide = document.getElementsByClassName("drawer-side");
//         if (drawerSide.length > 0) {
//             drawerSide[0].style.width = '0';
//         }
//     }

//     async function handleLogout(){
//         e.preventDefault();

//         const res= await dispatch(logout());
//         if(res?.payload?.success){
//             naviagte('/');
//         }
//     }

//     return (
//         <div className="min-h-[90vh]">
//             <div className="drawer fixed top-0 left-0 z-50 w-fit">
//                 <input className="drawer-toggle" id="my-drawer" type="checkbox" />
//                 <div className="drawer-content">
//                     {/* Ensure this label wraps the menu icon and it is absolutely positioned */}
//                     <label htmlFor="my-drawer" className="cursor-pointer relative">
//                         <FiMenu
//                             onClick={changeWidth}
//                             size={"32px"}
//                             // className="font-bold text-white m-4 absolute top-0 left-0"
//                             className="font-bold text-white m-4 absolute top-0 left-0 hover:text-gray-300 hover:scale-110 transition duration-300"
//                         />
//                     </label>
//                 </div>
//                 <div className="drawer-side w-0">
//                     <label htmlFor="my-drawer" className="drawer-overlay"></label>
//                     <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
//                         <li className="w-fit absolute right-2 z-50">
//                             <button onClick={hideDrawer}>
//                                 <AiFillCloseCircle size={24} />
//                             </button>
//                         </li>
//                         <li>
//                             <Link to="/">Home</Link>
//                         </li>
//                         {isLoggedIn && role==='ADMIN' && (
//                             <li>
//                                 <Link to='/admin/dashboard'>Admin DashBoard</Link>
//                             </li>
//                         )}
//                         <li>
//                             <Link to="/courses">All Courses</Link>
//                         </li>
//                         <li>
//                             <Link to="/contact">Contact Us</Link>
//                         </li>
//                         <li>
//                             <Link to="/about">About Us</Link>
//                         </li>
//                         {!isLoggedIn && (
//                             <li className="absolute bottom-4 w-[90%]">
//                             <div className="w-full flex items-center justify-center">
//                                 <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-800 hover:bg-blue-600 transition-all" >
//                                 {/* style={{ backgroundColor: '#007BFF' }} */}
                                
//                                 <Link to='/login'>Login</Link>
//                                 </button>
//                                 <button className="btn-secondary px-4 py-1 font-semibond rounded-md w-full bg-yellow-600 hover:bg-yellow-500 transition-all ml-2">
//                                 <Link to='/signup'>Signup</Link>
//                                 </button>
//                             </div>
//                             </li>
//                         )}

//                         {isLoggedIn && (
//                             <li className="absolute bottom-4 w-[90%]">
//                             <div className="w-full flex items-center justify-center">
//                                 <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-600">
//                                 <Link to='/user/profile'>Profile</Link>
//                                 </button>
//                                 <button className="btn-secondary px-4 py-1 font-semibond rounded-md w-full bg-yellow-400">
//                                 <Link onClick={handleLogout} >Logout</Link>
//                                 </button>
//                             </div>
//                             </li>
//                         )}

//                     </ul>
//                 </div>
//             </div>
//             {children}
//             <Footer />
//         </div>
//     );
// }

// export default HomeLayout;









// // import React from "react";
// // import { FiMenu } from "react-icons/fi";
// // import { AiFillCloseCircle } from "react-icons/ai";
// // import { Link } from "react-router-dom";
// // import Footer from "../components/Footer";

// // function HomeLayout({ children }) {

// //     function changeWidth() {
// //         const drawerSide = document.getElementsByClassName("drawer-side");
// //         if (drawerSide.length > 0) {
// //             drawerSide[0].style.width = 'auto';
// //         }
// //     }

// //     function hideDrawer() {
// //         const element = document.getElementsByClassName("drawer-toggle");
// //         if (element.length > 0) {
// //             element[0].checked = false;
// //         }
// //         const drawerSide = document.getElementsByClassName("drawer-side");
// //         if (drawerSide.length > 0) {
// //             drawerSide[0].style.width = '0';
// //         }

// //         // changeWidth();
// //     }

// //     return (
// //         <div className="min-h-[90vh]">
// //             <div className="drawer absolute left-0 z-50 w-fit">
// //                 <input className="drawer-toggle" id="my-drawer" type="checkbox" />
// //                 <div className="drawer-content">
// //                     <label htmlFor="my-drawer" className="cursor-pointer relative">
// //                         <FiMenu
// //                             onClick={changeWidth}
// //                             size={"32px"}
// //                             className="font-bold text-white m-4 absolute top-0 left-0"
// //                         />
// //                     </label>
// //                 </div>
// //                 <div className="drawer-side w-0">
// //                     <label htmlFor="my-drawer" className="drawer-overlay">
// //                     </label>
// //                     <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
// //                         <li className="w-fit absolute right-2 z-50">
// //                             <button onClick={hideDrawer}>
// //                                 <AiFillCloseCircle size={24} />
// //                             </button>
// //                         </li>
// //                         <li>
// //                             <Link to="/">Home</Link>
// //                         </li>
// //                         <li>
// //                             <Link to="/courses">All Courses</Link>
// //                         </li>
// //                         <li>
// //                             <Link to="/contact">Contact Us</Link>
// //                         </li>
// //                         <li>
// //                             <Link to="/about">About Us</Link>
// //                         </li>
// //                     </ul>
// //                 </div>
// //             </div>
// //             {children}
// //             <Footer />
// //         </div>
// //     );
// // }

// // export default HomeLayout;







import React from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if the user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for displaying the options according to the role
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        if (drawerSide.length > 0) {
            drawerSide[0].style.width = 'auto';
        }
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        if (element.length > 0) {
            element[0].checked = false;
        }
        const drawerSide = document.getElementsByClassName("drawer-side");
        if (drawerSide.length > 0) {
            drawerSide[0].style.width = '0';
        }
    }

    async function handleLogout(e) {
        e.preventDefault();  // Prevent default form submission behavior
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            navigate('/');  // Redirect to homepage after logout
        }
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer fixed top-0 left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    {/* Ensure this label wraps the menu icon and it is absolutely positioned */}
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4 absolute top-0 left-0 hover:text-gray-300 hover:scale-110 transition duration-300"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to='/admin/dashboard'>Admin Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-800 hover:bg-blue-600 transition-all">
                                        <Link to='/login'>Login</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-1 font-semibond rounded-md w-full bg-yellow-600 hover:bg-yellow-500 transition-all ml-2">
                                        <Link to='/signup'>Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full bg-blue-600">
                                        <Link to='/user/profile'>Profile</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-yellow-400"
                                        onClick={handleLogout}>  {/* Correct Logout handler */}
                                        Logout
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;


