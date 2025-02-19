import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const currUser = users.find((user) => user.email === email);

      if (!currUser) {
        alert('There is no such user!');
        return;
      }

      if (currUser.password !== password) {
        alert('Incorrect password!');
        return;
      }

      dispatch(login(currUser));
      localStorage.setItem("currUser", JSON.stringify(currUser));
      alert('Logged in successfully');
      navigate('/dashboard');
    } catch  {
      
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input type="email" placeholder="Enter your email"value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
