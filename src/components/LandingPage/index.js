import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Container, Grid, Card } from "@mui/material";
import "../style.css";
import Header from "../Header";

function LandingPage() {
  const [value, setValue] = useState();
  const [movieData, setMovieData] = useState();
  const [movieId, setMovieId] = useState();

  const handleChange = (id) => {
    setMovieId(id);
  };

  const other = () => {
    setMovieId();
  };

  useEffect(() => {
    axios
      .get(
        value
          ? `https://api.themoviedb.org/3/search/movie?&api_key=3583464c166eb3446babdeabbc188153&query=${value}`
          : `http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
      )
      .then((res) => {
        console.log("res", res.data.results);
        setMovieData(res.data.results);
      });
  }, [value]);

  return (
    <>
      <Header setValue={setValue} />
      <Container maxWidth="xl" sx={{ my: "25px" }}>
        <Typography variant="h5" sx={{ color: "white", mb: 4, ml: 5 }}>
          {value ? "Your searched movies" : "Latest & Trending"}
        </Typography>
        <Grid container spacing={2} sx={{ ml: 4 }}>
          {movieData &&
            movieData.map((item) => (
              <Grid xs={12} md={3}>
                <div class="flip-card" tabIndex="0">
                  <div class="flip-card-inner">
                    <Card
                      key={item.id}
                      className="flip-card-front"
                      bgcolor="red"
                      elevation={2}
                      onMouseOver={() => handleChange(item.id)}
                      onMouseOut={other}
                      sx={{
                        pb: "70px",
                        height: "370px",
                        width: "300px",
                        margin: "15px 0",
                        backgroundColor: "#1c4966",
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                        alt="movie poster"
                        width="300px"
                        height="350px"
                        overflow="hidden"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ color: "white", p: 2 }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: "white", p: 2 }}>
                          {item.vote_average}
                        </Typography>
                      </Box>
                    </Card>
                    {movieId == item.id && (
                      <Card
                        className="flip-card-back"
                        sx={{
                          alignContent: "center",
                          pt: "70px",
                          p: "5px",
                          height: "430px",
                          width: "300px",
                          margin: "15px 0",
                          backgroundColor: "black",
                          "&:hover": {
                            boxShadow:
                              "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)",
                          },
                        }}
                      >
                        <Typography sx={{ color: "white", p: 2 }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: "white", p: 2 }}>
                          {item.overview}
                        </Typography>
                      </Card>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default LandingPage;
