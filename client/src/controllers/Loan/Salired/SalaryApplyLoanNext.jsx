import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import Stepper2 from "../Stepper/Stepper2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ServerApi from "../../../../ServerApi/ServerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const SalaryApplyLoanNext = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    salarySlip: null,
    bankStatements: null,
    incomeTaxReturn: null,
    panUpload: null,
    adhaarFront: null,
    adhaarBack: null,
    referenceName: "",
    referenceMobileNumber: "",
    accountNumber: "",
    ifscCode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0], // Assuming only one file is allowed per input
    });
  };

  const handleSubmit = async () => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${ServerApi}/api/file/upload`, {
        method: "POST",
        body: form,
        headers: {
          token: `Barear ${token}`,
        },
      });
      const data = await response.json();
      if (data.success === true) {
        toast.success(data.message, {
          autoClose: 2000,
        });
        navigate("/manageLoanDrawer");
      } else {
        toast.error(data.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Div>
        <Stepper2 />
        <Typography variant="h3" color="initial" sx={{ textAlign: "center" }}>
          Salary Loan
        </Typography>
        <Form className="main-form" style={{ marginTop: "2rem" }}>
          <Box className="main-box">
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="salarySlip" className="labels">
                  Salary Slip
                </Label>
                <Input
                  className="input"
                  type="file"
                  placeholder=""
                  name="salarySlip"
                  id="salarySlip"
                  onChange={handleFileChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="bankStatements" className="labels">
                  Bank Statements (12 months)
                </Label>
                <Input
                  className="input"
                  type="file"
                  placeholder=""
                  name="bankStatements"
                  id="bankStatements"
                  onChange={handleFileChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="incomeTaxReturn" className="labels">
                  Income Tax Return
                </Label>
                <Input
                  className="input"
                  type="file"
                  placeholder="Adhaar Number"
                  name="incomeTaxReturn"
                  id="incomeTaxReturn"
                  onChange={handleFileChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="referenceName" className="labels">
                  Reference (Name)
                </Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="Enter Full Name"
                  name="referenceName"
                  id="referenceName"
                  onChange={handleChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="referenceMobileNumber" className="labels">
                  Reference (Mobile Number)
                </Label>
                <Input
                  className="input"
                  type="number"
                  placeholder="Enter Mobile Number"
                  name="referenceMobileNumber"
                  id="referenceMobileNumber"
                  onChange={handleChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="accountNumber" className="labels">
                  Account Number
                </Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="Account Number"
                  name="accountNumber"
                  id="accountNumber"
                  onChange={handleChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="ifscCode" className="labels">
                  IFSC Code
                </Label>
                <Input
                  className="input"
                  type="text"
                  placeholder="IFSC Code"
                  name="ifscCode"
                  id="ifscCode"
                  onChange={handleChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="panUpload" className="labels">
                  PAN Upload
                </Label>
                <Input
                  className="input"
                  type="file"
                  placeholder=""
                  name="panUpload"
                  id="panUpload"
                  onChange={handleFileChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="adhaarFront" className="labels">
                  Adhaar Front
                </Label>
                <Input
                  className="input"
                  type="file"
                  placeholder="adhaar front"
                  name="adhaarFront"
                  id="adhaarFront"
                  onChange={handleFileChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item">
              <Item className="inputs">
                <Label htmlFor="adhaarBack" className="labels">
                  Adhaar Back
                </Label>
                <Input
                  className="input"
                  type="file"
                  placeholder="Adhaar Back"
                  name="adhaarBack"
                  id="adhaarBack"
                  onChange={handleFileChange}
                ></Input>
              </Item>
            </Div>
            <Div className="main-item" style={{ display: "flex", gap: "1rem" }}>
              <Button
                variant="contained"
                color="warning"
                sx={{ fontSize: "1.5rem", marginTop: "2rem" }}
                onClick={() => navigate("/salaryLoanDrawer")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "1.5rem", marginTop: "2rem" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Div>
          </Box>
        </Form>
      </Div>
    </Container>
  );
};

export default SalaryApplyLoanNext;
