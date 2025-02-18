import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });


  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem("currUser"));
    if (storeUser) {
      setUser(storeUser);
    } else {
      navigate("/");
    }
  }, [navigate]);


  const handleSignOut = () => {
    localStorage.removeItem("currUser"); 
    navigate("/"); 
  };

  return (
    <div className="profile">
      <Card className=" square">
        <CardContent>
          <Typography variant="h5">Profile</Typography>
          <Typography variant="body1"><strong>User Name:</strong> {user.firstName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Button className="btn" variant="contained" color="secondary" onClick={handleSignOut}>
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile
