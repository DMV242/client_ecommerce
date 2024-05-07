import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const PlanelShowUser = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      setStatus("loading");
      try {
        const response = await axios.get("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setStatus("succeeded");
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des utilisateurs :", error);
        setStatus("failed");
      }
    };
    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (userId) => {
    setStatus("loading");
    try {
      await axios.delete(`http://localhost:8000/delete-user-by-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "user-id": userId
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
      setStatus("succeeded");
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
      setStatus("failed");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
          fontWeight: 600,
          color: "#000000",
          marginBottom: "24px",
        }}
      >
        Voir les Utilisateurs
      </Typography>
      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      )}

      {status === "failed" && (
        <Typography variant="body1" sx={{ color: "error.red", marginBottom: "24px" }}>
          Une erreur s'est produite lors de la récupération des utilisateurs.
        </Typography>
      )}

      {status === "succeeded" && (
        <Box>
          {users && users.length > 0 ? (
            <ul>
              {users.map((user, index) => (
                <Box key={index} sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: "16px" }}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Supprimer
                  </Button>
                </Box>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">Aucun utilisateur trouvé.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PlanelShowUser;
