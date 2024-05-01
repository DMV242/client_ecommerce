import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUser, selectUserConnected } from "../redux/slice/UserConnected";
import NavBar from "../components/Navigation/NavBar";
import { Box, Typography } from "@mui/material";
import PlanelUser from "../components/profile/PlanelUser";

const Profile = () => {
  const user = useSelector(selectUserConnected);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(profileUser(token));
    }
  }, [dispatch, token, user]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <PlanelUser user={user} />
      </Box>
    </>
  );
};

export default Profile;
