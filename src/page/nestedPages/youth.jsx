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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import img1 from '../../image/salimbalan.png';

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Table cell style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Table row style
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Page and drawer style
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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Youth() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newLastName, setNewLastName] = useState('');
  const [newMiddleName, setNewMiddleName] = useState('');
  const [newBirth, setNewBirth] = useState('');
  const [newContact, setNewContact] = useState(0);
  const [newProvince, setNewProvince] = useState('');
  const [newBarangay, setNewBarangay] = useState('');
  const [newZone, setNewZone] = useState(0);
  const [newMunicipal, setNewMunicipal] = useState('');

  const [users, setUsers] = useState([]);
  const userCollectionReference = collection(db, 'users_data');

  const createUser = async () => {
    await addDoc(userCollectionReference, {
      firstname: newName,
      Middlename: newMiddleName,
      lastname: newLastName,
      Age: newAge,
      birthday: newBirth,
      contact_number: newContact,
      municipality: newMunicipal,
      barangay: newBarangay,
      zone: newZone,
      province: newProvince,
    });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users_data', id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionReference);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:'rgba(254, 200, 10, 1)'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
            Youth
          </Typography>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <img src={img1} alt="" style={{height:'auto', width:'50px'}}/>
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
        <TableContainer component={Paper}>
          <div>
            <Button onClick={handleOpen2}>Open modal</Button>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h3>Residents Form</h3>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', }}>
                  <div>
                  <input type="text" placeholder="Name..." onChange={(event) => { setNewName(event.target.value); }}  style={{margin:'5px'}}/>
                  <input type="text" placeholder="Middle..." onChange={(event) => { setNewMiddleName(event.target.value); }} style={{margin:'5px'}} />
                  <input type="text" placeholder="Lastname..." onChange={(event) => { setNewLastName(event.target.value); }} style={{margin:'5px'}}/>
                  <input type="number" placeholder="Age..." onChange={(event) => { setNewAge(event.target.value); }} style={{margin:'5px'}}/>
                  <input type="text" placeholder="Date of birth..." onChange={(event) => { setNewBirth(event.target.value); }} style={{margin:'5px'}}/>
                  </div>
                 <div>
                  <input type="number" placeholder="Contact..." onChange={(event) => { setNewContact(event.target.value); }} style={{margin:'5px'}}/>
                  <input type="text" placeholder="Municipal..." onChange={(event) => { setNewMunicipal(event.target.value); }} style={{margin:'5px'}}/>
                  <input type="text" placeholder="Barangay..." onChange={(event) => { setNewBarangay(event.target.value); }} style={{margin:'5px'}}/>
                  <input type="number" placeholder="Zone..." onChange={(event) => { setNewZone(event.target.value); }} style={{margin:'5px'}}/>
                  <input type="text" placeholder="Province..." onChange={(event) => { setNewProvince(event.target.value); }} style={{margin:'5px'}}/>
                 </div>
                </div>
                <button type='button' className='btn btn-success' onClick={createUser}>Add residents</button>
              </Box>
            </Modal>
          </div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Middlename</StyledTableCell>
                <StyledTableCell>Lastname</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Birthday</StyledTableCell>
                <StyledTableCell>Contact</StyledTableCell>
                <StyledTableCell>Municipality</StyledTableCell>
                <StyledTableCell>Barangay</StyledTableCell>
                <StyledTableCell>Zone</StyledTableCell>
                <StyledTableCell>Province</StyledTableCell>
                <StyledTableCell>Buttons</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
              .filter((row) => row.Age >= 18 && row.Age <= 30)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.firstname}
                  </StyledTableCell>
                  <StyledTableCell>{row.Middlename}</StyledTableCell>
                  <StyledTableCell>{row.lastname}</StyledTableCell>
                  <StyledTableCell>{row.Age}</StyledTableCell>
                  <StyledTableCell>{row.birthday}</StyledTableCell>
                  <StyledTableCell>{row.contact_number}</StyledTableCell>
                  <StyledTableCell>{row.municipality}</StyledTableCell>
                  <StyledTableCell>{row.barangay}</StyledTableCell>
                  <StyledTableCell>{row.zone}</StyledTableCell>
                  <StyledTableCell>{row.province}</StyledTableCell>
                  <StyledTableCell>
                    <button onClick={() => deleteUser(row.id)}>delete</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Main>
    </Box>
  );
}
