import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../auth/authSlice';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // location: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
//   const dispatch = useDispatch();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await fetch("http://localhost:3000/users");
      const users =  await userResponse.json();

      // Check if email already exists
    
if (users.find((user) => user.email === formData.email)) {
  alert('Email already exists');
  return;
}

      // Determine the next user ID
      const nextUserId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

      const newUser = { ...formData, id: nextUserId };

      // Add the new user
      await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      navigate('/login');
    //   const locationResponse = await fetch("http://localhost:3000/movies");
    //   const locations =  await locationResponse.json();

    //   // Determine the next location ID
    //   const nextLocationId = locations.length > 0 ? Math.max(...locations.map((loc) => loc.id)) + 1 : 1;

    //   // Add the new location if it doesn't already exist
    //   const existingLocation = locations.find((loc) => loc.userId === nextUserId);
    //   if (!existingLocation) {
    //     await fetch("http://localhost:3000/movies", {
    //       method: 'POST',
          
    //       body: JSON.stringify({ id: nextLocationId, location: formData.location, userId: nextUserId }),
    //     });
    //   }

    //   dispatch(login(newUser));
      alert('Sign up successful');
     
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred during sign up.');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInput}
          required
        />
        <br />
        <label>Last Name</label>
        <input name="lastName" type="text"  placeholder="Last Name" value={formData.lastName} onChange={handleInput} required />
        <br />
        <label>Email</label>
        <input name="email" type="email" placeholder="Email"value={formData.email} onChange={handleInput} required />
        <br />
        <label>Password</label>
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInput} required/>
        <br />
        {/* <label>Location</label>
        <input name="location" type="text" placeholder="Location" value={formData.location} onChange={handleInput} required />
        <br /> */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};






export default Signup;
