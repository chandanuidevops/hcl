import { AppBar, Box, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";

type NavItem = {
    label: string;
    href: string;
};

interface HeaderProps {
    navItems: NavItem[];
}

const NavBar = (props: HeaderProps) => {
    const { navItems } = props;

    const showNavItems = (item: NavItem) => {
        return (
            <NavLink
                key={item.label}
                to={item.href}
                style={{ color: "black", fontSize: "2rem", fontWeight: 500, display: "flex", gap: "4rem" }}
            >
                {item.label}
            </NavLink>
        );
    };

    return (
        <Box className="nav-items" sx={{ flexGrow: 1, width: "100vw" }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{width:'100%',display:'flex', justifyContent:'space-around', alignItems:'center', gap:'2rem'}}>{navItems.map(showNavItems)}</Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
