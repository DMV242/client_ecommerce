import {
  Box,
  Button,
  IconButton,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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
  const [nameProduct, setNameProduct] = useState("");
  const [categorieProduct, setCategorieProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [joueurForVideoProduct, setJoueurForVideoProduct] = useState("");
  // const [dureeVideoProduct, setDureeVideoProduct] = useState("");
  // const [qualiteVideoProduct, setQualiteVideoProduct] = useState("");
  const [descriptionVideoProduct, setDescriptionVideoProduct] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    console.log("Name:", nameProduct);
    console.log("Category:", categorieProduct);
    console.log("Price:", priceProduct);
    console.log("Player for video:", joueurForVideoProduct);
    // console.log("Video duration:", dureeVideoProduct);
    // console.log("Video quality:", qualiteVideoProduct);
    console.log("Description:", descriptionVideoProduct);
    console.log("Image file:", imageFile ? imageFile.name : "No file");

    handleUpload();
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
        Ajouter un Produit
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
              Nom du produit
            </Typography>
          </Box>
          <CustomTextField
            label=" Nom du produit"
            variant="outlined"
            required
            fullWidth
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
              Catégorie du produit
            </Typography>
          </Box>
          <CustomTextField
            label="Categorie du produit"
            variant="outlined"
            required
            fullWidth
            value={categorieProduct}
            onChange={(e) => setCategorieProduct(e.target.value)}
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
              Joueur pour la vidéo
            </Typography>
          </Box>
          <CustomTextField
            label="Joueur pour la vidéo"
            variant="outlined"
            required
            fullWidth
            value={joueurForVideoProduct}
            onChange={(e) => setJoueurForVideoProduct(e.target.value)}
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
              Prix de la vidéo
            </Typography>
          </Box>
          <CustomTextField
            label="Prix de la vidéo"
            variant="outlined"
            required
            fullWidth
            value={priceProduct}
            onChange={(e) => setPriceProduct(e.target.value)}
          />
          {/*<Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              mt: 1,
              width: "100%",
            }}
          >
  
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "49%",
                mt: 1,
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
                Durée de la vidéo
              </Typography>
              <FormControl
                variant="outlined"
                required
                sx={{ marginTop: "10px" }}
              >
                <InputLabel id="video-duration-label">
                  Durée de la vidéo
                </InputLabel>
                <Select
                  labelId="video-duration-label"
                  id="video-duration-select"
                  value={dureeVideoProduct}
                  label="Durée de la vidéo"
                  onChange={(e) => setDureeVideoProduct(e.target.value)}
                >
                  <MenuItem value="30">30 seconds</MenuItem>
                  <MenuItem value="60">1 minute</MenuItem>
                  <MenuItem value="120">2 minutes</MenuItem>
                  <MenuItem value="300">5 minutes</MenuItem>
                  <MenuItem value="600">10 minutes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                mt: 1,
                width: "49%",
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
                Qualité de la vidéo
              </Typography>
              <FormControl variant="outlined" required sx={{ marginTop: "10px"}}>
                <InputLabel id="video-quality-label">
                  Qualité de la vidéo
                </InputLabel>
                <Select
                  labelId="video-quality-label"
                  id="video-quality-select"
                  value={qualiteVideoProduct}
                  label="Qualité de la vidéo"
                  onChange={(e) => setQualiteVideoProduct(e.target.value)}
                  sx={{ height: "50px"}}
                >
                  <MenuItem value="720p">720p HD</MenuItem>
                  <MenuItem value="1080p">1080p Full HD</MenuItem>
                  <MenuItem value="4k">4K Ultra HD</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
              Description du produit
            </Typography>
          </Box>
          <TextField
            label="Description du produit"
            variant="outlined"
            required
            fullWidth
            multiline
            value={descriptionVideoProduct}
            onChange={(e) => setDescriptionVideoProduct(e.target.value)}
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
    </Box>
  );
};

export default PlanelAddProduct;
