import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from 'react-router-dom';

const TemporaryDrawer = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Data = localStorage.getItem("Studentlogintoken") || localStorage.getItem("Facultylogintoken");
  const parsedata  = Data ? JSON.parse(Data) : null;

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
  {
  parsedata && parsedata.token ? 
    parsedata.user === "faculty" ? 
      <List>
        {['Profile', 'About', 'Contact', 'List', 'Logout'].map((text, index) => (
          <NavLink to={`/${text.toLowerCase()}`} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    : parsedata.user === "student" ? 
      <List>
        {['Profile', 'About', 'Contact', 'Outpass', 'Logout'].map((text, index) => (
          <NavLink to={`/${text.toLowerCase()}`} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    :
      <List>
        {['Login', 'Registrations', 'About', 'Contact'].map((text, index) => (
          <NavLink to={`/${text.toLowerCase()}`} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
  :
  <List>
    {['Login', 'Registrations', 'About', 'Contact'].map((text, index) => (
      <NavLink to={`/${text.toLowerCase()}`} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </NavLink>
    ))}
  </List>
}

    <Divider />
    {
      parsedata && parsedata.token ? 
      <List>
        {["Exit"].map((text, index) => (
          
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
           
        ))}
      </List> 
      :
      <List>
        {["Exit"].map((text, index) => (
         
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
           
        ))}
      </List> 
      
      

    }
      
      
      
    </Box>
  );

  return (
    <div>
      <button onClick={toggleDrawer('left', true)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
      
      </button>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
