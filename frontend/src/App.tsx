import React , {useEffect , useState} from "react";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import SendMessageForm from "./components/SendMessageForm";
import MessagesList from "./components/MessageList";

const App : React.FC = () =>{
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  const {user} = useAuth();
  const [isChecking , setIsChecking] = useState(true) ; 

  useEffect(()=>{
    setIsChecking(false);
  } , []);
  if(isChecking){
    return (
      <div>
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-white text-xl">
        Loading...
      </div>
        </div>
      </div>
    )
  }

  if(!isAuthenticated || !user){
    return <LoginPage />
  }

  return (
    <div>
      <div>
        <Header user={user} />
          <div className="grid md:grid-cols gap-4">
            <SendMessageForm/>
            <MessagesList/>
          </div>
      </div>
    </div>
  )
}

export default App ; 