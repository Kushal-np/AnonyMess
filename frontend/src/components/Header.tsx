import React from "react";
import {Mail , LogOut} from "lucide-react"
import type {User} from "../types"

import { useAuth } from "../hooks/useAuth";

interface HeaderProps{
    user:User;
}

const Header:React.FC<HeaderProps> =({user}) =>{
    const {logout} = useAuth();
    const handleLogout = () =>{
        logout();

    }

    return(
        <header className="border-solid border-red-400 border-2 ">
            <div>
                <div>
                    <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800 " >Anonymous Message </h1>
                    <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
               NotificationBell Icon
                <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg transition" >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    )
}

export default Header ; 