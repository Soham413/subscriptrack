import React from "react";
import { IoNotifications } from "react-icons/io5";

const Navbar = () =>
    <nav className="w-[90%] h-16 fixed top-0 bg-white shadow-md flex justify-between items-center px-6">
        <h1 className="text-lg font-semibold">Welcome to Subscription Tracker</h1>
        <div>
            {/* profile photo */}
            <IoNotifications />
        </div>
    </nav>;

export default Navbar;