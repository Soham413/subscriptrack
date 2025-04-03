import { Bell, CircleUserRound } from "lucide-react";
import React from "react";
import { IoNotifications } from "react-icons/io5";

const Navbar = () =>
    <nav className="h-16 sticky top-0 bg-white shadow-md flex justify-between items-center px-6">
        <div className="left">
        <h1 className="text-lg font-semibold">Welcome to Subscription Tracker</h1>
        </div>
        <div className="flex gap-4 align-middle text-xl">
            <CircleUserRound />
            <Bell />
        </div>
    </nav>;

export default Navbar;