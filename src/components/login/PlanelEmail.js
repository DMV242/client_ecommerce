import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { loginGoogleUser } from "../../redux/slice/UserConnected";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  </SvgIcon>
);

const PlanelEmail = ({ email, setEmail, handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const { email, given_name, family_name } = response.data;
      dispatch(
        loginGoogleUser({
          email,
          firstName: given_name,
          lastName: family_name,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          const message =
            error?.error || "An error occurred during login.";
          setSnackbarMessage(message);
          setOpenSnackbar(true);
        });
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => fetchUserData(tokenResponse.access_token),
    onError: () => console.log("Login Failed"),
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  });

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "26px",
          color: "#111111",
          lineHeight: "24px",
          textTransform: "none",
        }}
      >
        Ollosa
      </Typography>
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 500,
          fontSize: "28px",
          color: "#000000",
          lineHeight: "32px",
          textTransform: "none",
          letterSpacing: "normal",
          mt: 4,
        }}
      >
        Saisis ton adresse e-mail pour nous rejoindre ou te connecter.
      </Typography>
      <TextField
        label="E-mail"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        sx={{ mt: 4 }}
      />
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          color: "#757575",
          lineHeight: "24px",
          textTransform: "none",
          letterSpacing: "normal",
          width: "340px",
          mt: 4,
        }}
      >
        En continuant, tu acceptes les conditions d'utilisation et tu confirmes
        avoir lu la politique de confidentialité de Ollosa.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          mt: 4,
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            width: "100px",
            backgroundColor: "#000",
            color: "#FFF",
            borderRadius: "100px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#000",
              color: "#FFF",
            },
          }}
        >
          Continuer
        </Button>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={() => loginWithGoogle()}
          sx={{
            background: "#FFFFFF",
            color: "#757575",
            "&:hover": {
              background: "#FFFFFF",
              color: "#757575",
            },
            mt: 4,
          }}
        >
          Continuer avec Google
        </Button>
      </Box>
    </>
  );
};

export default PlanelEmail;
