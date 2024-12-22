import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-lg font-semibold">Blog</div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <Link to="/createPost"> Create Blog</Link>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
