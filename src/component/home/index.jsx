
import { useAuth } from '../../context/authContext'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button'; 
import PropTypes from 'prop-types';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SourceIcon from '@mui/icons-material/Source';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import GavelIcon from '@mui/icons-material/Gavel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import img1 from "../../image/salimbalan.png"
import { doSignOut } from '../../firebase/auth';








const drawerWidth = 240;

export default function home() {
      const { currentUser } = useAuth();
      const navigate = useNavigate()
      const { userLoggedIn } = useAuth()
   

     
      
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, background:'white' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}> {/* Set justifyContent: 'space-between' */}
          <Typography variant="h6" noWrap component="div">
            <strong><h5 style={{color:'black'}}>D A S H B O A R D</h5></strong>
          </Typography>
          <div className='d-flex justify-content-end'>
            <img src={img1} alt="" style={{ width: '50px', height: 'auto' }} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box', background:'rgba(26, 43, 88, 1)'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className='text-center' style={{ marginTop: '20px'}}>
            <strong><h5 style={{color:'white'}}>B I M S</h5></strong>
        </div>
        <Divider />
        <List style={{color:'white', fontSize: '5px'}}>
        {['Barangay Certificate', 'Barangay Officials', 'Barangay Indigency'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/${text === 'Barangay Certificate' ? 'cert' : text === 'Barangay Officials' ? 'official': text === 'Barangay Indigency' ? 'indi' :text.toLowerCase()}`} style={{textDecoration: 'none', color:'white'}}>
            <ListItemButton>
              <ListItemIcon>
              {index === 0 ?  <FileCopyIcon style={{color:'white'}}/> : index === 1 ? <GavelIcon style={{color:'white'}}/> : <InsertDriveFileIcon style={{color:'white'}}/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
        <Divider />
        <List style={{color: "white", fontSize:'5px'}}>
        {['Barangay Clearance', 'Residents Record', 'Request Documents', 'View Map'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/${text === 'Barangay Clearance' ? 'brgClearance' : text === "Residents Record" ? 'brgRecords': text === 'Request Documents' ? 'official' : text === 'View Map' ? 'map': text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ?  <FileCopyIcon style={{color: 'white'}}/> : index ===1 ? <FileOpenIcon style={{color:'white'}}/> : index ===2 ?<SourceIcon style={{color:'white'}}/> : index ===3 ? <AddLocationAltIcon style={{color: 'white'}}/>: null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
        
         <Button color="inherit" onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Logout</Button> {/* Add logout button */}
      </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
       <Toolbar/>
        <Typography paragraph>
          <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
        </Typography>
       <Box>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
            <Card style={{margin:'20px', background: 'rgba(45, 153, 8, 1)', color: 'white', width:'300px', height: '150px'}}>
              <CardContent>
               
                <Typography variant="h5" component="h2">
                  <Link to='/houses' style={{textDecoration: 'none', color:'white'}}>House</Link>
                </Typography>
              </CardContent>
            </Card>
            <Card style={{margin:'20px', background: 'rgba(240, 69, 151, 1)', color:'white',width:'300px', height: '150px'}}>
              <CardContent>
                
                <Typography variant="h5" component="h2">
                <Link to='/population' style={{textDecoration: 'none', color:'white'}}>Population</Link>
                </Typography>
              </CardContent>
            </Card>
            <Card style={{margin:'20px', background:'rgba(254, 200, 10, 1)', color: 'white', width:'300px', height: '150px'}}>
              <CardContent>
               
                <Typography variant="h5" component="h2">
                <Link to='/youth' style={{textDecoration: 'none', color:'white'}}>Youth</Link>
                </Typography>
              </CardContent>
            </Card>
            <Card style={{margin:'20px', background: 'rgba(40, 125, 105, 1)', color: 'white', width:'300px', height: '150px'}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                <Link to='/zone' style={{textDecoration: 'none', color:'white'}}>Zone</Link>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
