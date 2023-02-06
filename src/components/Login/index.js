import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import axios from "axios";
import useStyles from "../styles";

function Longi() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signUp, setSignUp] = useState(false);

  const logInHandler = () => {
    const variant = "error";
    axios
      .post("/login", { number: phoneNumber })
      .then((res) => {
        console.log("res", res);
        if (phoneNumber) {
          navigate("/");
        } else {
          enqueueSnackbar("User not found! Please enter a valid number.", {
            variant,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        enqueueSnackbar("User not found! Please enter a valid number.", {
          variant,
        });
      });
  };

  const signUpHandler = () => {
    axios
      .post("/signup", { number: phoneNumber })
      .then((res) => {
        console.log("res", res);
        const variant = "success";
        enqueueSnackbar("You've registered successfully!", {
          variant,
        });
      })
      .catch((err) => {
        const variant = "error";
        console.log("err", err);
        enqueueSnackbar("User is already exist! Please try another number.", {
          variant,
        });
      });
  };

  const register = () => {
    setSignUp(!signUp);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ my: "10px" }}>
        <Box className={classes.container}>
          <Typography variant="h5" className={classes.spacing}>
            {signUp ? "Register your number to start" : "Login with number"}
          </Typography>
          <Box className={classes.spacing}>
            <TextField
              type="tel"
              id="standard-basic"
              label="phone no."
              variant="standard"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength="10"
            />
            {signUp ? (
              <Button
                sx={{ ml: 4 }}
                variant="outlined"
                onClick={signUpHandler}
                disabled={phoneNumber.length !== 10}
              >
                Submit
              </Button>
            ) : (
              <Button
                sx={{ ml: 4 }}
                variant="outlined"
                onClick={logInHandler}
                disabled={phoneNumber.length !== 10}
              >
                Submit
              </Button>
            )}
          </Box>
          <Box sx={{ textAlign: "center", pt: "50px" }}>
            {signUp ? (
              <Typography>
                Already have an account?
                <Button color="primary" onClick={register}>
                  Login
                </Button>
              </Typography>
            ) : (
              <Typography>
                Don't have an account?
                <Button color="primary" onClick={register}>
                  Sign up
                </Button>
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Longi />
    </SnackbarProvider>
  );
}
