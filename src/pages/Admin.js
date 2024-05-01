import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import NavBar from "../components/Navigation/NavBar";
import PlanelAddProduct from "../components/Products/planelAddProduct";
import PlanelShowProduct from "../components/Products/planelShowProduct";
import PlanelShowUser from "../components/Products/planelShowUser";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F5F5F5",
          width: "100%",
          height: "32px",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Container
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 4,
          mb: 2,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Ajouter un Produit" {...a11yProps(0)} />
            <Tab label="Voir les Produits" {...a11yProps(1)} />
            <Tab label="Voir les Utilisateurs" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} style={{ width: '100%'}}>
          <PlanelAddProduct />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} style={{ width: '100%'}}>
          <PlanelShowProduct />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} style={{ width: '100%'}}>
          <PlanelShowUser />
        </CustomTabPanel>
      </Container>
    </>
  );
};

export default Admin;
