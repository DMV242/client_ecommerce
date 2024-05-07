import {
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  styled,

} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { addNewPlayer } from "../../redux/slice/Player";
import { useDispatch } from "react-redux";

const BASE_URL = "http://127.0.0.1:8000";

const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    top: "-5%",
  },
  "& .MuiInputBase-input": {
    height: "50px",
    padding: "0 14px",
  },
});

const Input = styled("input")({
  display: "none",
});

const PlanelAddProduct = () => {
  const dispatch = useDispatch();
  const [namePlayer, setnamePlayer] = useState("");
  const [prenomJoueur, setprenomJoueur] = useState("");
  const [descriptionPlayer, setdescriptionPlayer] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const token = localStorage.getItem("token")

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleUpload = () => {
    if (imageFile) {
      console.log("Uploading", imageFile);
    }
  };

  const saveData = () => {
    const formData = new FormData();
    formData.append("lastName", namePlayer);
    formData.append("firstName", prenomJoueur);
    formData.append("description", descriptionPlayer)
    formData.append("image", imageFile, imageFile.name)
    formData.append("token", token)
    console.log("Name:", namePlayer);

    console.log("Prénom Player for video:", prenomJoueur);

    console.log("Description:", descriptionPlayer);
    console.log("Image file:", imageFile ? imageFile.name : "No file");

    try {
      dispatch(addNewPlayer(formData));
      setSnackbarSeverity("success");
      setSnackbarMessage("Le joueur a été ajouté avec succès !");
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'ajout du joueur :", error.message);
      setSnackbarSeverity("error");
      setSnackbarMessage("Une erreur s'est produite lors de l'ajout du joueur.");
    }
    setSnackbarOpen(true);
    handleUpload();
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          color: "#000000",
          lineHeight: "32px",
          textTransform: "none",
          letterSpacing: "normal",
        }}
      >
        Ajouter un joueur au catalogue
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "50%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            margin: "10px",
            padding: "20px",
            borderRadius: "20px",
            border: "1px solid #111",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "100%",
            }}
          >
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {imageFile && (
              <TextField
                sx={{ ml: 2 }}
                variant="outlined"
                disabled
                fullWidth
                value={imageFile.name}
              />
            )}
          </Box>
          {imagePreview && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ mt: 2 }}
              >
                Upload Image
              </Button>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 4,
              mb: 1,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#000000",
                lineHeight: "32px",
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              Nom du Joueur
            </Typography>
          </Box>
          <CustomTextField
            label=" Nom du produit"
            variant="outlined"
            required
            fullWidth
            value={namePlayer}
            onChange={(e) => setnamePlayer(e.target.value)}
          />


          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              mt: 1,
              mb: 1,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#000000",
                lineHeight: "32px",
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              Prénom Joueur
            </Typography>
          </Box>
          <CustomTextField
            label="Joueur pour la vidéo"
            variant="outlined"
            required
            fullWidth
            value={prenomJoueur}
            onChange={(e) => setprenomJoueur(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              mt: 1,
              mb: 1,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#000000",
                lineHeight: "32px",
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              Description du joueur
            </Typography>
          </Box>
          <CustomTextField
            label="Description du joueur"
            variant="outlined"
            required
            fullWidth
            value={descriptionPlayer}
            onChange={(e) => setdescriptionPlayer(e.target.value)}
          />

          <Button
            onClick={saveData}
            sx={{
              display: "flex",
              backgroundColor: "#111111",
              color: " #FFF",
              borderRadius: "20px",
              height: "44px",
              width: "100%",
              mt: 4,
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default PlanelAddProduct;
