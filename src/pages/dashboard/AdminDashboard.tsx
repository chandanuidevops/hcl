import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AttendancePage from './AttendancePage';
import StaffPage from './StaffPage';
import ShiftSchedulerPage from '../ShiftSchedulerPage';

const drawerWidth = 240;

const roles = ['Doctor', 'Nurse', 'Technician'];
const shifts = ['Morning', 'Afternoon', 'Night'];


const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Attendance', path: '/attendance' },
    { text: 'Staffs', path: '/staff' },
    { text: 'Shifts Schedule', path: '/shifts' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          paddingTop: 2,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<AttendancePage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/shifts" element={<ShiftSchedulerPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default AdminDashboard;
