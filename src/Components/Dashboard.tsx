import { Box, Typography } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import { navItems } from "../Mockdata/routesData";
import FeaturedHealthTopics from "./FeaturedHealthTopics";

const Dashboard = () => {
    return (
        <Box
            className="dashboard-container"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
            }}
        >
            <Box className="Title">
                <Typography variant="h5" style={{textAlign:'center', fontSize: "bold", fontWeight: "600", padding:'3rem' }} component="h1" gutterBottom>
                    Bayer HealthCare
                </Typography>
                <NavBar navItems={navItems} />
            </Box>
            <Box className="dashboard-content">
                <Typography variant="h3" component="h2" sx={{fontWeight:'bold'}} gutterBottom>
                    Your Health, Our Priority
                </Typography>
                <Typography sx={{fontWeight:'bold'}} variant="body1" component="p" gutterBottom>
                    Explore the latest health information and resources from Bayer Healthcare
                </Typography>
            </Box>
            <FeaturedHealthTopics/>
        </Box>
    );
};

export default Dashboard;
