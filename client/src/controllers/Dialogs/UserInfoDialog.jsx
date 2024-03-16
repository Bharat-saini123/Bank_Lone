import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "styled-components";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/Context";
import ServerApi from "../../../ServerApi/ServerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const Item = styled.div`
  .main-inputs {
    padding: 1rem;
    .inputs {
      width: 100%;
      height: 3rem;
      border: 1px solid #3434347d;
      margin-top: 1rem;
      .input {
        width: 100%;
        height: 100%;
        font-size: 1.5rem;
        padding: 1rem 2rem;
        cursor: pointer;
        display: block;
        outline: none;
        border: none;
      }
    }
  }
  .main-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-user-btn {
      display: flex;
      gap: 2rem;
      padding: 2rem;
    }
  }
`;
const Input = styled.input``;

const UserInfoDiaLog = () => {
  const { username, phone, email, Dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/userProfile");
  };
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    Dispatch({ type: "CHANGE_USER_VALUE", name, value });
  };
  const updateUser = async (user) => {
    const { username, email, phone } = user;
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/auth/user/userUpdate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      body: JSON.stringify({
        username,
        email,
        phone,
      }),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.success !== true) {
      toast.error(data.message, {
        autoClose: 2000,
      });
    } else {
      toast.success(data.message, {
        autoClose: 2000,
      });
      handleClose();
    }
  };
  React.useEffect(() => {
    handleClickOpen();
  }, []);
  return (
    <>
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
            <Typography
              variant="h3"
              color="initial"
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              {" "}
              Edit User Details
            </Typography>
          </Item>
          <Item>
            <Item className="main-inputs">
              <Box className="inputs">
                <Input
                  type="text"
                  placeholder="username"
                  className="input"
                  value={username}
                  onChange={handleInput}
                  name="username"
                ></Input>
              </Box>
            </Item>
            <Item className="main-inputs">
              <Box className="inputs">
                <Input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={handleInput}
                  name="email"
                ></Input>
              </Box>
            </Item>
            <Item className="main-inputs">
              <Box className="inputs">
                <Input
                  type="number"
                  placeholder="Phone"
                  className="input"
                  value={phone}
                  onChange={handleInput}
                  name="phone"
                ></Input>
              </Box>
            </Item>
          </Item>

          <Item>
            <Box className="main-buttons">
              <Box></Box>
              <Item className="main-user-btn">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                  sx={{ fontSize: "1.5rem" }}
                >
                  cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontSize: "1.5rem" }}
                  onClick={() =>
                    updateUser({
                      username,
                      email,
                      phone,
                    })
                  }
                >
                  save
                </Button>
              </Item>
            </Box>
          </Item>
        </Container>
      </Dialog>
    </>
  );
};
export default UserInfoDiaLog;
