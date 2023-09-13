import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, BrowserRouter } from "react-router-dom"

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Accounts } from './Accounts';
import { Transactions } from './Transactions';
import { Transfer } from './Transfer';
import { Login } from './Login';
import AiiaButtonGroup from './AiiaButtonGroup';

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    accounts?: any;
}

export default function ResponsiveDrawer(props: Props) {
    const { accounts } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState(getDefaultActiveMenu() || "");
    const navigate = useNavigate();

    function getDefaultActiveMenu() {
        let url = window.location.href;
        if (url.indexOf("?") !== -1) {
            url = url.split("?")[0];
        }
        return url.split("/")[3];
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        {
            href: 'accounts',
            title: 'My Accounts',
        },
        {
            href: 'transactions',
            title: 'Transaction History',
        },
        {
            href: 'transfer',
            title: 'Make a Payment',
        }
    ];

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {menuItems.map((menuItem, index) => (
                    // <NavLink to={menuItem.href}>
                    <NavLink to={menuItem.href} >
                        <ListItem key={menuItem.title} disablePadding>
                            {/* className={menuItem.href === activeMenu ? 'active' : ''} onClick={() => {
                        setActiveMenu(menuItem.href);
                        navigate(menuItem.href)
                    }} */}
                            <ListItemButton>
                                <ListItemIcon className='aiia-white'>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={menuItem.title} />
                            </ListItemButton>


                        </ListItem>
                    </NavLink>

                    //   </NavLink>
                ))}
            </List>


        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex', width: "60%" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: "none",
                    background: "#fff",
                    color: "#333",
                    // width: { sm: `calc(100% - ${drawerWidth}px)` },
                    // ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ boxShadow: "0 8px 6px -10px black" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className="header-content" sx={{
                        right: "10px",
                        position: "absolute"
                    }} variant="h6" noWrap component="div">
                        <div className='displayFlex'>
                        <div _ngcontent-dwe-c22="" className="header__brand">
                            <img _ngcontent-dwe-c22="" src="https://cdn.aiia.eu/public/Images/aiia_logo.svg" alt="Aiia" className="header__brand__logo" />
                        </div>
                        <AiiaButtonGroup></AiiaButtonGroup>
                        </div>
                                               
                        
                        <div>
                            Hello <span className='aiia-bold'>{accounts[0]?.owner}</span>
                        </div>

                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{ marginTop: "50px", marginLeft: "25px", flexGrow: 1, p: 3 }}
            >



                <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                    <Route path="/accounts" element={<Accounts accounts={accounts} />} />
                    <Route path="/transactions" element={<Transactions accounts={accounts} />} />
                    <Route path="/transfer" element={<Transfer accounts={accounts} />} />
                </Routes>

            </Box>
        </Box>
    );
}
