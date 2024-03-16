import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ServerApi from "../../../ServerApi/ServerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const AdhaarOtp = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState({
    adhaarNumber: "",
  });
  const sendOtpAdhaar = async () => {
    const { adhaarNumber } = number;
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/verify/adhaar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      body: JSON.stringify({
        adhaarNumber,
      }),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "SUCCESS") {
      toast.success(data.message, {
        autoClose: 2000,
      });
      navigate("/verifyAdhaarOtp");
    } else {
      toast.error("data not found", {
        autoClose: 2000,
      });
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
        Enter Adhaar Number
      </Typography>
      <Div className="main-adhaar-otp">
        <Box className="main-box">
          <Item className="inputs">
            <Input
              className="input"
              type="text"
              placeholder=" Enter Adhaar Number"
              value={number.adhaarNumber}
              onChange={handleInput}
              name="adhaarNumber"
            ></Input>
          </Item>
          <Item>
            <Button
              variant="contained"
              color="primary"
              onClick={sendOtpAdhaar}
              sx={{ display: "block", width: "100%", fontSize: "1.5rem" }}
            >
              Send Otp
            </Button>
          </Item>
        </Box>
      </Div>
    </Container>
  );
};

export default AdhaarOtp;
