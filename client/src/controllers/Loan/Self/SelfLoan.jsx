import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stepper1 from "../Stepper/Stepper1";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerApi from "../../../../ServerApi/ServerApi";

const Container = styled.div`
  background-color: #fff;
  padding: 7rem;
`;
const Div = styled.div`
  .main-form {
    background-color: #fff;
    .main-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      gap: 5rem;
      .main-item {
        .inputs {
          width: 25rem;

          .labels {
            font-size: 1.5rem;
            display: inline-block;
          }
          .input {
            width: 100%;
            height: 100%;
            display: block;
            font-size: 1.2rem;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 1rem 2rem;
            border: 1px solid #3434342d;
          }
        }
      }
    }
  }
`;

const Item = styled.div``;
const Form = styled.form``;
const Input = styled.input``;
const Label = styled.label``;

const SelfLoan = () => {
  const navigate = useNavigate();
  const [userLoan, setUserLoan] = useState({
    username: "",
    panNumber: "",
    adhaarNumber: "",
    dob: "",
    netMonthlyIncome: "",
    communicationAddress: "",
    loanAmount: "",
    tensure: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserLoan({
      ...userLoan,
      [name]: value,
    });
  };

  const openNextPage = async () => {
    const {
      username,
      panNumber,
      adhaarNumber,
      dob,
      netMonthlyIncome,
      communicationAddress,
      loanAmount,
      tensure,
    } = userLoan;
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/verify/panVerify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      body: JSON.stringify({
        username,
        panNumber,
        adhaarNumber,
        dob,
        netMonthlyIncome,
        communicationAddress,
        loanAmount,
        tensure,
        userType: "self",
      }),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.success === false) {
      toast.error(data.message || data.message, {
        autoClose: 2000,
      });
    } else {
      if (data.success !== true) {
        toast.error(data.status.message || data.message, {
          autoClose: 2000,
        });
      } else {
        toast.success(data.message, {
          autoClose: 2000,
        });
        setUserLoan({
          username: "",
          panNumber: "",
          adhaarNumber: "",
          dob: "",
          netMonthlyIncome: "",
          communicationAddress: "",
          loanAmount: "",
          tensure: "",
        });
        navigate("/selfLoneDrawerNext");
      }
    }
  };
  return (
    <Container>
      <Div>
        <Stepper1 />
        <Typography variant="h3" color="initial" sx={{ textAlign: "center" }}>
          Self Loan
        </Typography>
        <Form className="main-form" style={{ marginTop: "2rem" }}>
          <Box className="main-box">
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="username" className="labels">
                  Full Name (As Per Pan)
                </Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter Full Name"
                  name="username"
                  id="username"
                  value={userLoan.username}
                  onChange={handleInput}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="panNumber" className="labels">
                  PAN NUMBER
                </Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="PAN Number"
                  name="panNumber"
                  id="panNumber"
                  value={userLoan.panNumber}
                  onChange={handleInput}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="adhaarNumber" className="labels">
                  Adhaar Number
                </Label>
                <Input
                  className="input"
                  type="number"
                  placeholder="Adhaar Number"
                  name="adhaarNumber"
                  id="adhaarNumber"
                  value={userLoan.adhaarNumber}
                  onChange={handleInput}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="dob" className="labels">
                  Date of Birth
                </Label>
                <Input
                  className="input"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  name="dob"
                  id="dob"
                  value={userLoan.dob}
                  onChange={handleInput}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="netMonthlyIncome" className="labels">
                  Net Monthly Income
                </Label>
                <Input
                  className="input"
                  type="number"
                  placeholder="Net Monthly Income"
                  name="netMonthlyIncome"
                  id="netMonthlyIncome"
                  value={userLoan.netMonthlyIncome}
                  onChange={handleInput}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs text-area-inputs">
                <Label htmlFor="communicationAddress" className="labels">
                  Communication Address
                </Label>
                <textarea
                  className=""
                  type="text"
                  placeholder="Communication address"
                  name="communicationAddress"
                  id="communicationAddress"
                  rows={2.5}
                  cols={23}
                  style={{
                    fontSize: "1.5rem",
                    padding: "1rem 2rem",
                    outline: "none",
                    border: "1px solid #3434342d",
                  }}
                  value={userLoan.communicationAddress}
                  onChange={handleInput}
                ></textarea>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="loanAmount" className="labels">
                  Loan Amount
                </Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="Loan Amount"
                  name="loanAmount"
                  id="loanAmount"
                  value={userLoan.loanAmount}
                  onChange={handleInput}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="username" className="labels">
                  Tensure
                </Label>
                <select
                  style={{
                    display: "block",
                    width: "100%",
                    height: "3rem",
                    outline: "none",
                    cursor: "pointer",
                    border: "1px solid #3434342d",
                  }}
                  name="tensure"
                  id="tensure"
                  value={userLoan.tensure}
                  onChange={handleInput}
                >
                  <option value={1}>1 month</option>
                  <option value={2}>2 month</option>
                  <option value={3}>3 month</option>
                  <option value={4}>4 month</option>
                  <option value={5}>5 month</option>
                  <option value={6}>6 month</option>
                  <option value={7}>7 month</option>
                  <option value={8}>8 month</option>
                  <option value={9}>9 month</option>
                  <option value={10}>10 month</option>
                  <option value={11}>11 month</option>
                  <option value={12}>12 month</option>
                </select>
              </Item>
            </Div>
            <Div className="main-item">
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.5rem", marginTop: "2rem" }}
                onClick={openNextPage}
              >
                Next
              </Button>
            </Div>
          </Box>
        </Form>
      </Div>
    </Container>
  );
};

export default SelfLoan;
