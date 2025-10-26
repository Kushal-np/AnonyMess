import React , {useState , FormEvent , ChangeEvent} from "react";
import { useAuth } from "../hooks/useAuth";
import {Mail , LogIn} from "lucide-react"

const LoginPage : React.FC = () =>{
    const [username , setUsername] = useState('');
    const {login , isLogginIn , loginError} = useAuth();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(username.trim()){
            login(username);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
    };

    return(
        <div>
            <div>
                <div>
                    <div>
                        <Mail className="w-12 h-12 text-purple-600"></Mail>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Anonymous Message</h1>
                    <p className="text-gray-600">Send and recieve anonymous messages</p>
                    
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" >
                            Choose a username
                        </label>
                        <input id="username" type="text" value={username} onChange={handleInputChange} className="w-full px-4 py-3 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition" placeholder="Enter Username" required disabled={isLogginIn}/>
                        <button type="submit" disabled={isLogginIn} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                            <LogIn className="w-5 h-5" />
                            {isLogginIn ? "Logging in...":"Login"}
                        </button>
                        {
                            loginError && (
                                <p className="text-red-500 text-sm text-center">
                                    {loginError.message || "Failed to login , please try again."}
                                </p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
};


export default LoginPage