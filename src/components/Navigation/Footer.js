import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
        width: "100%",
        height: "100%",
      }}
    >
      <Container
        sx={{
          mt: 1,
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Ollosa
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link
            href="/terms"
            style={{
              textDecoration: "none",
              color: "#111",
              marginRight: "10px",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Conditions d'utilisation
          </Link>
          {" | "}
          <Link
            href="/privacy"
            style={{
              textDecoration: "none",
              color: "#111",
              marginLeft: "10px",
              "&:hover": { textDecoration: "none" },
            }}
          >
            Politique de confidentialité
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
