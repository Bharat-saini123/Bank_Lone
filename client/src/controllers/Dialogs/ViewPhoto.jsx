import * as React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "styled-components";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Home from "../Home";
import ServerApi from "../../../ServerApi/ServerApi";

const Container = styled.div`
  .main-user-dialog {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-close-icon {
      padding: 1rem;
    }
  }
`;
const Div = styled.div``;
const Item = styled.div``;

const ViewPhoto = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  React.useEffect(() => {
    handleClickOpen();
  }, []);
  return (
    <>
      <Home />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <Container>
          <Div className="main-user-dialog">
            <Div></Div>
            <Div className="main-close-icon">
              <Tooltip
                title={
                  <p style={{ padding: "0.6rem 1rem", fontSize: "1.2rem" }}>
                    Close
                  </p>
                }
              >
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Div>
          </Div>
          <Item>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                alt="Travis Howard"
                src="./images/user.jpg.png"
                sx={{
                  height: "30rem",
                  width: "30rem",
                  display: "inline-block",
                  cursor: "pointer",
                  margin: "auto",
                }}
              />
            </Box>
          </Item>
        </Container>
      </Dialog>
    </>
  );
};
export default ViewPhoto;
