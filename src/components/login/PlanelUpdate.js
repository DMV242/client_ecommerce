import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const PlanelUpdate = ({ email, goToFirstTab, goToSecondTab }) => {
  const [code, setCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resendCode = async () => {
    await axios.post(`${BASE_URL}/send-verification-code`, { email });
    alert("Verification code has been resent to your email.");
  };

  const handleSaveNewPassword = async () => {
    const response = await axios.post(`${BASE_URL}/reset-password`, {
      email,
      code,
      newPassword,
    });
    alert(response.data.message);
    goToSecondTab();
  };

  return (
    <>
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
        Vérifie ton adresse e-mail et saisis un nouveau mot de passe.
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
          mt: 4,
        }}
      >
        Nous avons envoyé un code à <br />
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
        label="Code"
        variant="outlined"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        fullWidth
        sx={{ mt: 4 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="resend code"
                onClick={resendCode}
                edge="end"
              >
                <CachedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Nouveau mot de passe"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 4,
        }}
      >
        <Button
          onClick={goToSecondTab}
          sx={{
            width: "150px",
            backgroundColor: "#FFF",
            color: "#000",
            border: "1px solid #000",
            borderRadius: "100px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FFF",
              color: "#000",
              border: "1px solid #000",
            },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSaveNewPassword}
          sx={{
            width: "150px",
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
          Enregistrer
        </Button>
      </Box>
    </>
  );
};

export default PlanelUpdate;
