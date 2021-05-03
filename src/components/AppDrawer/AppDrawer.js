import React,{useState} from 'react';
import clsx from 'clsx';
import { Drawer as MUIDrawer,ListItem,
    List,ListItemIcon,
    ListItemText,AppBar,Toolbar,Typography,IconButton,Divider,InputBase,Badge,Menu,MenuItem } from '@material-ui/core';
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import { DataUsage as OverviewIcon,Report as AppReport,Menu as MenuIcon,ChevronLeft as ChevronLeftIcon,ChevronRight as ChevronRightIcon,
  Search as SearchIcon,Notifications as NotificationsIcon,AccountCircle,MoreVert as MoreIcon, School  } from '@material-ui/icons';
import {BrowserRouter as Router,withRouter,Route,Switch,Redirect } from 'react-router-dom';

import Overview from '../Overview/Overview';
import App from '../App/App';
import Team from '../Team/Team';
import { Reports, StudentReport, ClassReport, SchoolReport } from '../Reports/Reports';
import useToken from '../App/useToken';
import SchoolPortal from '../SchoolPortal/schoolportal';
import Dashboard from '../Dashboard/dashboard';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 0,
    },
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    }, 
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: drawerWidth
    },
     drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
}));



const AppDrawer = (props) => {
  
    const {history} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open,setOpen] = useState(false);
    const {token,setToken} = useToken();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    if(!token) {
      return <SchoolPortal setToken={setToken} />
    }
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
   

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const logout = () =>{
      sessionStorage.clear();
      history.push("/");
      setToken("");
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={() => {handleMenuClose();logout();}}>Logout</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        
      </Menu>
    );

    const AppDrawerData = [
      {
          title: "Overview",
          icon: <OverviewIcon />,
          onClick: () => history.push("/")
      },
      {
          title: "Reports",
          icon: <AppReport />,
          onClick: () => history.push("/reports")
      }
  
  ];



  return (
      <div className={classes.root}>
            <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            >
                <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton,open && classes.hide)}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap className={classes.title} >
                    Virtual School
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                      <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                              <NotificationsIcon />
                            </Badge>
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </div>
                </Toolbar>
               
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <MUIDrawer variant="persistent" anchor="left" className={classes.drawer}  open={open}
              classes={{
                paper: classes.drawerPaper,
              }}>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  </div>
                 <Divider />
                      <List>
                      {AppDrawerData.map((item, index) => {
                        const { title,icon,onClick } = item;
                        return (
                          <ListItem button key={title} onClick={onClick}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                          <ListItemText primary={title} />
                        </ListItem>
                        );
                        })}
                    </List>

                </MUIDrawer>
                <main
                  className={clsx(classes.content, {
                    [classes.contentShift]: open,
                  })}
                >
                  <div className={classes.drawerHeader} />

                 
                  <Route exact path="/" component={Overview} />
                  <Route path="/reports" component={Reports} />
               
                </main>
        </div>
  );
};

export default withRouter(AppDrawer);