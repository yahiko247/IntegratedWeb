import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import img1 from '../image/salimbalan.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { addDoc, collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase";
import { useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function BarangayRecords() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  //opem modal
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  //collecting data
const [newName, setNewName] = useState('');
const [newDrug, setNewDrug] = useState(0);
const [newPunch, setNewPunch] = useState(0);
const [newReport, setNewReport] = useState(0);
const [newRumble, setNewRumble] = useState(0);

//creating table
const [users, setUsers] = useState([]);
const userCollectionReference = collection(db, 'records');

const createUser = async () => {
  await addDoc(userCollectionReference, {
    name: newName,
    report: newReport,
    rumble: newRumble,
    punch: newPunch,
    drugs: newDrug
  });
};


const deleteUser = async (id) => {
  const userDoc = doc(db, 'records', id);
  await deleteDoc(userDoc);
};

useEffect(() => {
  const getUsers = async () => {
    const data = await getDocs(userCollectionReference);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };
  getUsers();
}, []);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{background:'rgba(26, 43, 88, 1)'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }),  }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
            Barangay Records
          </Typography>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <img src={img1} alt="" style={{height: 'auto', width:'50px'}}/>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader /> 
        <Button onClick={handleOpen2}>Open Modal</Button>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3> Residents Record</h3>
           <div>
            <input type="text" placeholder="fullname..." onChange={(event) => { setNewName(event.target.value); }}  style={{margin:'5px'}}/>
            <input type="number" placeholder="Record..." onChange={(event) => { setNewReport(event.target.value); }} style={{margin:'5px'}} />
            <input type="number" placeholder="enter attemp..." onChange={(event) => { setNewRumble(event.target.value); }} style={{margin:'5px'}}/>
            <input type="number" placeholder="enter attemp..." onChange={(event) => { setNewPunch(event.target.value); }} style={{margin:'5px'}}/>
            <input type="number" placeholder="enter attemp..." onChange={(event) => { setNewDrug(event.target.value); }} style={{margin:'5px'}}/>
           </div>
           <button type='button' className='btn btn-success' onClick={createUser}>Add residents</button>
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Residents Name</TableCell>
                <TableCell align="right">Barangay report</TableCell>
                <TableCell align="right">Ramble</TableCell>
                <TableCell align="right">Random punch</TableCell>
                <TableCell align="right">Drug Case</TableCell>
                <TableCell align="right">Button</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.report}</TableCell>
                  <TableCell align="right">{row.punch}</TableCell>
                  <TableCell align="right">{row.rumble}</TableCell>
                  <TableCell align="right">{row.drugs}</TableCell>
                  <TableCell align="right"><button onClick={() => deleteUser(row.id)}>delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Main>
    </Box>
  );
}
