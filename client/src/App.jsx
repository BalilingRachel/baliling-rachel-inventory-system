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
    if(username === '' || password === ''){
      setErrorMessage("Username and Password is required!");
      setShowMessage(true);
    }
    else {
      const response = await login(username, password);
      
      if(response) {
        navigate('/inventory');
      }
      else {
        setErrorMessage('Invalid username or password!');
      }
      setShowMessage(true);
    }
  }

  return (
    <>
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#ffe4e1', 
      padding: '5px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <div style={{ 
        border: '1px solid #ffd1dc', 
        backgroundColor: '#fff0f5', 
        margin: '5px', 
        padding: '20px', 
        borderRadius: '15px', 
        width: '400px', 
        height: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          paddingBottom: '10px', 
          fontSize: '30px', 
          textAlign: 'center', 
          color: '#ff69b4', 
          fontFamily: 'cursive'
        }}>LOGIN</div>
        {
          showMessage && (
            <div style={{ 
              margin: '10px', 
              backgroundColor: '#ffb6c1', 
              color: '#b22222', 
              textAlign: 'center',
              borderRadius: '5px',
              padding: '10px'
            }}>
              { errorMessage }
            </div>
          )
        }
        <div style={{ 
          display: 'flex', 
          gap: '5px', 
          margin: '20px', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '20px', color: '#ff69b4' }}>Username:</div>
          <input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ 
              borderRadius: '10px', 
              border: '1px solid #ff69b4', 
              padding: '10px', 
              color: '#ff69b4' 
            }} 
            type="text" 
          />
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '5px', 
          margin: '20px', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '20px', color: '#ff69b4' }}>Password:</div>
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ 
              borderRadius: '10px', 
              border: '1px solid #ff69b4', 
              padding: '10px', 
              color: '#ff69b4' 
            }} 
            type="password" 
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleLogin} 
            style={{ 
              backgroundColor: '#ff69b4', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '10px', 
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              border: 'none'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff85c0'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff69b4'}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
