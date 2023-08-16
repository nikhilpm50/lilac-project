import React, { useState } from "react";
import logo from "../../assets/lilac-logo.png";
import { css } from '@emotion/react';
import "./style.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import firebaseConfig from "../../FirebaseContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotificationTile from "../Notification/NotificationTile";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const style = {
  position: "absolute",
  top: "25%",
  right: 0,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  p: 4,
};

const responsiveStyles = css`
  @media (max-width: 576px) {
    width: 75%; 
    top: 50%;
    left: 50%
  }
`;

function NavBar() {
  const [open, setOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const handleModalOpen = () => setLogoutModal(true);
  const handleModalClose = () => setLogoutModal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();

  const notificationData = {
    profilePhoto:
      "https://www.socialketchup.in/wp-content/uploads/2020/05/fi-vill-JOHN-DOE.jpg",
    message: "Harris commented on your post",
    timestamp: "3 mins ago",
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      await auth.signOut();
      console.log("Logout successful");
      setLogoutModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar">
      <img className="logo" alt="logo" src={logo} />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={[style, responsiveStyles]}>
              <p className="notify-text">Notifications</p>
              <NotificationTile {...notificationData} />
            </Box>
          </Fade>
        </Modal>
      </div>

      <div>
        <Dialog
          open={logoutModal}
          onClose={handleModalClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Log Out</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleModalClose}>
              Cancel
            </Button>
            <Button onClick={handleLogout} autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {location.pathname !== "/" && (
        <div>
          <div className="nav-links">
            <Link to="/homepage" style={{ textDecoration: "none" }}>
              <p>Posts</p>
            </Link>
            <Link to="/course" style={{ textDecoration: "none" }}>
              <p>Course Creation</p>
            </Link>

            <p onClick={handleOpen}>Notifications</p>
            <p onClick={handleModalOpen}>Log Out</p>
          </div>
          <div className="nav-links-mobile">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <MenuIcon variant="contained" {...bindTrigger(popupState)} />

                  <Menu {...bindMenu(popupState)}>
                  <Link to="/homepage" style={{ textDecoration: "none" }}>
                    <MenuItem onClick={popupState.close}>Posts</MenuItem>
                    </Link>
                    <Link to="/course" style={{ textDecoration: "none" }}>
                    <MenuItem onClick={popupState.close}>Course Creation</MenuItem>
                    </Link>
                    <MenuItem onClick={()=>{popupState.close(); handleOpen();}}>Notifications</MenuItem>
                    <MenuItem onClick={()=>{popupState.close(); handleModalOpen();}}>Log Out</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
