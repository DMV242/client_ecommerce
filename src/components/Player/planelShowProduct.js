import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const PlanelShowProduct = () => {
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("idle"); // Pour gérer l'état de la requête
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      setStatus("loading");
      try {
        const response = await axios.get("http://localhost:8000/players");
        setPlayers(response.data.players);
        setStatus("succeeded");
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des joueurs :", error);
        setStatus("failed");
      }
    };

    fetchPlayers();
  }, []);

  const handleDeletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/player/${id}`);
      setPlayers(players.filter((player) => player._id !== id));
      setSnackbarSeverity("success");
      setSnackbarMessage("Le joueur a été supprimé avec succès !");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du joueur :", error.message);
      setSnackbarSeverity("error");
      setSnackbarMessage("Une erreur s'est produite lors de la suppression du joueur.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
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
        Voir les Joueurs
      </Typography>

      {status === "loading" && <Typography>Chargement en cours...</Typography>}

      {status === "failed" && <Typography>Une erreur s'est produite lors de la récupération des joueurs.</Typography>}

      {status === "succeeded" && (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
          {players.map((player, index) => (
            <Box key={index} sx={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
              <Typography variant="h6" gutterBottom>
                {player.firstName} {player.lastName}
              </Typography>
              <Button variant="contained" color="error" onClick={() => handleDeletePlayer(player._id)}>Supprimer</Button>
            </Box>
          ))}
        </Box>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default PlanelShowProduct;
