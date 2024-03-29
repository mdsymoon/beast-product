import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {MdToc} from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import {FaOpencart} from 'react-icons/fa';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {FcHome} from 'react-icons/fc';
import {RiFileList3Line} from 'react-icons/ri';
import {FaProjectDiagram} from 'react-icons/fa';
import {GrProjects} from 'react-icons/gr';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

const SideBar = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const history = useHistory();
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['Home'].map((text, index) => (
            <ListItem button key={text} onClick={() => history.push('/')}>
              <FcHome style={{fontSize:'30px', marginRight:'20px'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</FcHome>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['My Order List'].map((text, index) => (
            <ListItem button key={text} onClick={() => history.push('/dashboard/productList')}>
              <RiFileList3Line style={{fontSize:'30px', marginRight:'20px'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</RiFileList3Line>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Cart Product'].map((text, index) => (
            <ListItem button key={text} onClick={() => history.push('/dashboard/cartItem')}>
              <FaOpencart style={{fontSize:'30px', marginRight:'20px'}}> {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</FaOpencart>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Add Product'].map((text, index) => (
            <ListItem button key={text} onClick={() => history.push('/dashboard/addProduct')}>
              <AiOutlineFileAdd style={{fontSize:'30px', marginRight:'20px'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</AiOutlineFileAdd>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All Order List'].map((text, index) => (
            <ListItem button key={text} onClick={() => history.push('/dashboard/allOrderList')}>
              <FaProjectDiagram style={{fontSize:'25px', marginRight:'20px'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</FaProjectDiagram>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All Product List'].map((text, index) => (
            <ListItem button key={text} onClick={() => history.push('/dashboard/allProductList')}>
              <GrProjects style={{fontSize:'25px', marginRight:'20px'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</GrProjects>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
        <div>
      {[ 'left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MdToc style={{fontSize:"50px" , color: "white"}}/></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    );
};

export default SideBar;