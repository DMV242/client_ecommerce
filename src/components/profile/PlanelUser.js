import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteUser,
  logoutUser,
  postInfoUser,
  profileUser,
} from "../../redux/slice/UserConnected";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PlanelUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [pays, setPays] = useState("");
  const [province, setProvince] = useState("");
  const [ville, setVille] = useState("");
  const [codePostale, setCodePostale] = useState("");
  const [adresse, setAdresse] = useState("");
  const [adresseComplement, setAdresseComplement] = useState("");
  const [accountGoogle, setAccountGoogle] = useState(Boolean);
  const [isAdmin, setIsAdmin] = useState(Boolean);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(profileUser(token));
    }
  }, [dispatch, token, user]);

  const handleDateChange = (newValue) => {
    setDateOfBirth(dayjs(newValue));
  };

  useEffect(() => {
    if (user?.firstName) {
      setFirstName(user.firstName);
    }
    if (user?.lastName) {
      setLastName(user.lastName);
    }
    if (user?.email) {
      setEmail(user.email);
    }
    if (user?.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
    if (user?.dateOfBirth) {
      setDateOfBirth(dayjs(user.dateOfBirth));
    }
    if (user?.accountGoogle) {
      setAccountGoogle(user.accountGoogle);
    }
    if (user?.isAdmin) {
      setIsAdmin(user.isAdmin);
    }
    if (user?.pays) {
      setPays(user.pays);
    }
    if (user?.province) {
      setProvince(user.province);
    }
    if (user?.ville) {
      setVille(user.ville);
    }
    if (user?.codePostale) {
      setCodePostale(user.codePostale);
    }
    if (user?.adresse) {
      setAdresse(user.adresse);
    }
    if (user?.adresseComplement) {
      setAdresseComplement(user.adresseComplement);
    }
  }, [user]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    navigate("/");
    dispatch(logoutUser());
  };

  const handleSaveInfo = () => {
    const userData = {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      pays,
      province,
      ville,
      codePostale,
      adresse,
      adresseComplement,
    };
    const token = localStorage.getItem("token");
    dispatch(postInfoUser({ data: userData, token }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { md: "40%", xs: "90%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Information compte {user?.accountGoogle && "Google"}
          {user?.isAdmin && "Administrateur"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Prénom et Nom de famille
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          mt: 1,
          width: "100%",
        }}
      >
        <TextField
          label="Prénom"
          variant="outlined"
          required
          fullWidth
          sx={{ width: "49%" }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Nom de famille"
          variant="outlined"
          required
          fullWidth
          sx={{ width: "49%" }}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Adresse e-mail
        </Typography>
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            color: "#757575",
            lineHeight: "24px",
            textTransform: "none",
            letterSpacing: "normal",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Modifier
        </Typography>
      </Box>
      <TextField
        label="Adresse e-mail"
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          readOnly: true,
        }}
      />
      {!user?.accountGoogle && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#000000",
                lineHeight: "32px",
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              Mot de passe
            </Typography>
            <Typography
              sx={{
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                color: "#757575",
                lineHeight: "24px",
                textTransform: "none",
                letterSpacing: "normal",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Modifier
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily:
                "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              color: "#000000",
              lineHeight: "32px",
              textTransform: "none",
              letterSpacing: "normal",
            }}
          >
            ••••••••••••••••
          </Typography>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Numéro de téléphone
        </Typography>
      </Box>
      <TextField
        label="Numéro de téléphone"
        variant="outlined"
        required
        fullWidth
        sx={{ mt: 1 }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Date de naissance
        </Typography>
      </Box>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        sx={{ width: "100%", mt: 1 }}
      >
        <DatePicker
          sx={{ width: "100%", mt: 1 }}
          label="Date de naissance"
          value={dateOfBirth}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
          inputFormat="DD/MM/YYYY"
        />
      </LocalizationProvider>
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          color: "#000000",
          lineHeight: "32px",
          textTransform: "none",
          letterSpacing: "normal",
          mt: 4,
        }}
      >
        Lieu
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          mt: 1,
          width: "100%",
        }}
      >
        <TextField
          label="Pays/Région"
          variant="outlined"
          required
          fullWidth
          sx={{ width: "49%" }}
          value={pays}
          onChange={(e) => setPays(e.target.value)}
        />
        <TextField
          label="Province"
          variant="outlined"
          required
          fullWidth
          sx={{ width: "49%" }}
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          mt: 1,
          width: "100%",
        }}
      >
        <TextField
          label="Ville"
          variant="outlined"
          required
          fullWidth
          sx={{ width: "49%" }}
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />
        <TextField
          label="Code Postal"
          variant="outlined"
          required
          fullWidth
          sx={{ width: "49%" }}
          value={codePostale}
          onChange={(e) => setCodePostale(e.target.value)}
        />
      </Box>
      <TextField
        label="Adresse Postal"
        variant="outlined"
        required
        fullWidth
        sx={{ mt: 1 }}
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
      />
      <TextField
        label="Appartement, suite, bâtiment"
        variant="outlined"
        required
        fullWidth
        sx={{ mt: 1 }}
        value={adresseComplement}
        onChange={(e) => setAdresseComplement(e.target.value)}
      />
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ color: "#000", mt: 4 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 1.5,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Supprimer le compte
        </Typography>
        <Button
          onClick={() => handleDeleteUser(user._id)}
          sx={{
            border: "1px solid #111111",
            color: " #111111",
            borderRadius: "20px",
            height: "38px",
            width: "18%",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              fontFamily:
                "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            Supprimer
          </Typography>
        </Button>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ color: "#000", mt: 1.5 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: 1.5,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            lineHeight: "32px",
            textTransform: "none",
            letterSpacing: "normal",
          }}
        >
          Fonctionnalité administrateur
        </Typography>
        <Button
          onClick={() => navigate("/admin")}
          sx={{
            border: "1px solid #111111",
            color: " #111111",
            borderRadius: "20px",
            height: "38px",
            width: "18%",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              fontFamily:
                "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            Admin
          </Typography>
        </Button>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ color: "#000", mt: 1.5 }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "1OO%",
          mt: 4,
          mb: 4,
        }}
      >
        <Button
          onClick={handleSaveInfo}
          sx={{
            backgroundColor: "#111111",
            color: " #FFF",
            borderRadius: "20px",
            height: "38px",
            width: "18%",
            "&:hover": {
              backgroundColor: "#111111",
              color: " #FFF",
            },
          }}
        >
          <Typography
            sx={{
              display: "flex",
              fontFamily:
                "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            Enregistrer
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default PlanelUser;
