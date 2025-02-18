import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Avatar } from "@mui/material";
import MenuAppBar from "../Components/MenuAppBar"

const Dashboard = () => {
  const key = JSON.parse(localStorage.getItem("currUser"));
 

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [link, setLink] = useState("");
  const [movies, setMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editYear, setEditYear] = useState("");


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        const data = await response.json();
        const userMovies = data.filter((movie) => movie.userid === key.id);
        setMovies(userMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Add a new movie
  const addMovie = async (e) => {
    e.preventDefault();
    if (!title || !year || !link) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/movies");
      const moviesData = await response.json();

      const existingMovie = moviesData.find((mov) => mov.title === title && mov.userid === key.id);
      if (existingMovie) {
        alert("This movie is already in your list");
        return;
      }

      const newMovie = {
        // id: moviesData.length > 0 ? Math.max(...moviesData.map(m => m.id)) + 1 : 1,
        id: moviesData.length > 0 ? (Math.max(...moviesData.map(m => Number(m.id))) + 1).toString() : "1",
        userid: key.id,
        title,
        year,
        link,

      };

      await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      setMovies([...movies, newMovie]);
      setTitle("");
      setYear("");
      setLink("");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Handle Edit Click
  const handleEditClick = (movie) => {
    setEditingMovieId(movie.id);
    setEditTitle(movie.title);
    setEditYear(movie.year);
  };


  // Handle Save Edit
  const handleSaveEdit = async (id) => {
    try {
      const movieToUpdate = movies.find((movie) => movie.id === id);

      const updatedMovie = {
        id: movieToUpdate.id,
        userid: movieToUpdate.userid,
        title: editTitle,
        year: editYear,
        link: movieToUpdate.link,
      };

      await fetch(`http://localhost:3000/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });

      setMovies(movies.map((movie) => (movie.id === id ? updatedMovie : movie)));
      setEditingMovieId(null);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };


  // Handle Delete Movie
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/movies/${id}`, { method: "DELETE" });
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <MenuAppBar />

      {/* Add Movie Form */}
      <div className="cont">
        <div className="box">
          <h2>Dashboard</h2>
          <p><strong>Email:</strong> {key.email}</p>
          <p><strong>Name:</strong> {key.firstName}</p>

          <div className="card">
            <TextField
              label="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Release Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
            />
            <TextField
              label="Movie Poster Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={addMovie}>
              Add Movie
            </Button>
          </div>

          {/* <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
            Sign Out
          </Button> */}
        </div>
      </div>

      {/* Movie Cards */}
      <div className="grid">
        {movies.map((movie) => (
          <Card key={movie.id}>
            <Avatar src={movie.link} alt="Movie Poster"  style={{height:"100px"  , width:"100px", borderRadius: "none"}}/>
            <CardContent>
              {editingMovieId === movie.id ? (
                <>
                  <TextField
                    label="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Year"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <Button variant="contained" color="primary" onClick={() => handleSaveEdit(movie.id)}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setEditingMovieId(null)} >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Year: {movie.year}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(movie)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(movie.id)} >
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
