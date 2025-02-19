import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../Thunk/authThunk";

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.api.movies);
  const isLoading = useSelector((state) => state.api.isLoading);
  const isError = useSelector((state) => state.api.isError);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading movies...</div>;
  }

  if (isError) {
    return <div>Error loading movies!</div>;
  }

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
            {expandedMovieId === movie.id ? (
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
                  onClick={() => setExpandedMovieId(null)}
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
                  onClick={() => setExpandedMovieId(movie.id)}
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

export default MoviesList;
