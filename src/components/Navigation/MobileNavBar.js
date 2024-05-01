import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const DrawerList = ({ toggleDrawer }) => {
  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List sx={{ flexGrow: 1, overflow: "auto" }}>
        {["Nouveautés", "Tendances", "Joueurs", "Promotions"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArrowRightAltIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontFamily:
                      "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#111111",
                    lineHeight: "24px",
                    textTransform: "none",
                  }}
                >
                  {text}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Paramètre"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsSuggestIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{
                    fontFamily:
                      "Helvetica Now Text Medium, Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#111111",
                    lineHeight: "24px",
                    textTransform: "none",
                  }}
                >
                  {text}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawerList;
