import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        padding: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {movies.map((movie) => (
        <Card
          key={movie.id}
          style={{
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={movie.poster}
            alt="Movie Poster"
            style={{
              width: "100px",
              height: "100px",
              marginRight: "16px",
             borderRadius: "0px",
            }}
          />
          <CardContent style={{ flexGrow: 1 }}>
            {expandedUserId === movie.id ? (
              <>
                <Typography variant="h6" component="div" fontWeight="bold">
                  Movie Details:
                </Typography>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => setExpandedUserId(null)}
                  style={{ marginTop: "10px" }}
                >
                  Hide Poster
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" component="div" fontWeight="bold">
                  {movie.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Year: {movie.year}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setExpandedUserId(movie.id)}
                  style={{ marginTop: "10px" }}
                >
                  Show Poster
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MoviesList;