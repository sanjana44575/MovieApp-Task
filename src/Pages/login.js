import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import {  login } from '../auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch=useDispatch()
  
//   const userMatch = useSelector(auth); 

  const handleSubmit =async(e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3000/users")
    const value = await response.json();
    const currUser = value.find((user) => user.email === email)

    if(!currUser){
      alert('there is no such user!!')
      return;
    }

    // if ( email === currUser.email && password === currUser.password)
    // {
    //   const response = await fetch("http://localhost:3000/movies") 
    //   const locations= await response.json()
    //   const NewLocation=locations.filter((location)=>location.userId===currUser.id)
    //   currUser.locations=NewLocation;
    // }
    // console.log(currUser)
    // console.log(NewLocation)
    
    dispatch(login(currUser))
    localStorage.setItem("currUser",JSON.stringify(currUser))
    alert('Logged in successfully');
      navigate('/dashboard');
    
   
   

    // if (userMatch.email === email && userMatch.password === password) {
    //   alert('Logged in successfully');
    //   navigate('/dashboard');
    // } else {
    //   alert('Invalid email or password');
    // }
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
