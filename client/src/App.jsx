import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if(username == '' || password == ''){
      setErrorMessage("Username and Password is required!")
      setShowMessage(true);
 
    }
    else {
      const response = await login(username, password);
      
      if(response) {
        navigate('/inventory');
      }

      else{
        setErrorMessage('Inavalid username or password!');
      }
      setShowMessage(true);
    }
  }
  return (
    <>
    <div className="w-screen h-screen bg-pink-300 p-5 flex justify-center items-center">
      <div className="border border-gray-100 bg-pink-700 m-5 p-5 rounded w-[400px] h-[500px]">
        <div className="pb-2 text-3xl text-center text-white">LOGIN</div>
        {
          showMessage &&
          (
            <div className="m-2 bg-transparent bg-red-200 text-red-700 text-center ">
              { errorMessage }
            </div>
          )
         
        }
      
        <div className="flex gap-5 m-5 justify-center">
          <div className="text-2xl text-white">Username:</div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded border border-gray-400" type="text" />
        </div>

        <div className="flex gap-5 m-5 justify-center">
          <div className="text-2xl text-white">Password:</div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-gray-400" type="password" />
        </div>

        <div className="flex justify-end">
          <button onClick={handleLogin} className="bg-green-700 text-white p-3 rounded hover:bg-green-300 hover:cursor-pointer">LOGIN</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
