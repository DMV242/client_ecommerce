import React, { useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/UserConnected";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const PlanelPassword = ({ email, goToFirstTab, goToThirdTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.UserConnected.error);
  const status = useSelector((state) => state.UserConnected.status);
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  useEffect(() => {
    if (status === "succeeded") {
      setSnackbarMessage("Vous êtes connecté");
      setOpenSnackbar(true);
      navigate("/");
    } else if (error) {
      setSnackbarMessage(error);
      setOpenSnackbar(true);
    }
  }, [status, error, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const resendCode = async () => {
    try {
      await axios.post(`${BASE_URL}/send-verification-code`, { email });
      setSnackbarMessage("Verification code has been resent to your email.");
      setOpenSnackbar(true);
      goToThirdTab();
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.error || "Failed to send verification code."
      );
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
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
        Quel est ton mot de passe ?
      </Typography>
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          color: "#111",
          lineHeight: "24px",
          textTransform: "none",
          letterSpacing: "normal",
          width: "340px",
          mt: 2,
        }}
      >
        {email}{" "}
        <span
          onClick={goToFirstTab}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#757575",
          }}
        >
          Modifier
        </span>
      </Typography>
      <TextField
        label="Mot de passe"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        sx={{ mt: 4 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography
        onClick={resendCode}
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          color: "#757575",
          lineHeight: "24px",
          textTransform: "none",
          letterSpacing: "normal",
          width: "340px",
          mt: 2,
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Mot de passe oublié ?
      </Typography>
      <Button
        onClick={handleLogin}
        disabled={password.length < 6}
        sx={{
          mt: 4,
          width: "150px",
          backgroundColor: "#000",
          color: "#FFF",
          borderRadius: "100px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#000",
            color: "#FFF",
          },
          "&.Mui-disabled": {
            backgroundColor: "#ccc",
            color: "#666",
          },
        }}
      >
        Se connecter
      </Button>
    </>
  );
};

export default PlanelPassword;
