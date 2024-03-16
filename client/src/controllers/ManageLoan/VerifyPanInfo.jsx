import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ServerApi from "../../../ServerApi/ServerApi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { AppContext } from "../../Context/Context";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 5rem;
  .main-adhaar-otp {
    .main-box {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      .inputs {
        width: 50rem;
        height: 3rem;
        border: 1px solid #3434347f;
        margin-top: 2rem;
        .input {
          width: 100%;
          height: 100%;
          font-size: 1.5rem;
          padding: 1rem 2rem;
          display: block;
          outline: none;
          border: none;
          text-decoration: none;
        }
      }
    }
  }
`;
const Input = styled.input``;
const Item = styled.div``;
const Div = styled.div``;

const VerifyPanInfo = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState({
    username: "",
  });
  const {statusId}=useContext(AppContext);
  const sendUserInfoPan = async () => {
    const { username } = number;
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/verify/panInfoVerifyName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      body: JSON.stringify({
        username,
        statusId,

      }),
      credentials: "include",
    });
    const data = await response.json();
    if (data.success === false) {
      toast.error(data.message, {
        autoClose: 2000,
      });
    } else {
      toast.success(data.message, {
        autoClose: 2000,
      });
      setNumber({
        username: "",
      });
      navigate("/manageLoanDrawer");
    }
  };
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNumber({
      ...number,
      [name]: value,
    });
  };
  return (
    <Container>
      <Typography variant="h3" color="initial">
        Enter Full Name
      </Typography>
      <Div className="main-adhaar-otp">
        <Box className="main-box">
          <Item className="inputs">
            <Input
              className="input"
              type="text"
              placeholder=" Enter Full Name As In Pan Card"
              value={number.username}
              onChange={handleInput}
              name="username"
            ></Input>
          </Item>
          <Item>
            <Button
              variant="contained"
              color="primary"
              onClick={sendUserInfoPan}
              sx={{ display: "block", width: "100%", fontSize: "1.5rem" }}
            >
              Submit
            </Button>
          </Item>
        </Box>
      </Div>
    </Container>
  );
};

export default VerifyPanInfo;
