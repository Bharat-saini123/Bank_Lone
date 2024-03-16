import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ServerApi from "../../../ServerApi/ServerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
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

const VerifyAdhaarOtp = () => {
  const {statusId}=useContext(AppContext);
  const navigate = useNavigate();
  const [number, setNumber] = useState({
    otp: "",
  });
  const sendOtpAdhaar = async () => {
    const { otp } = number;
    console.log(otp);
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/verify/verifyAdhaar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      body: JSON.stringify({
        otp,
        statusId,
      }),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.response.status === "FAIL") {
      toast.error(data.response.message, {
        autoClose: 2000,
      });
    } else {
      if (data.response.status === "SUCCESS") {
        toast.success(data.response.message, {
          autoClose: 2000,
        });
        navigate("/manageLoanDrawer");
      } else {
        toast.error("server error", {
          autoClose: 2000,
        });
      }
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
        Verify Adhaar
      </Typography>
      <Div className="main-adhaar-otp">
        <Box className="main-box">
          <Item className="inputs">
            <Input
              className="input"
              type="text"
              placeholder="Enter otp"
              value={number.otp}
              onChange={handleInput}
              name="otp"
            ></Input>
          </Item>
          <Item>
            <Button
              variant="contained"
              color="primary"
              onClick={sendOtpAdhaar}
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

export default VerifyAdhaarOtp;
