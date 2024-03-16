import { styled } from "styled-components";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerApi from "../../ServerApi/ServerApi";
import { useState } from "react";

const Container = styled.div``;
const Item = styled.div``;
const Div = styled.div``;
const MainInputBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 5rem;
  flex-direction: column;
  background-color: #ededed;
  .main-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
    padding: 5rem;
    background-color: #fff;
    margin-top: rem;

    .inputs {
      width: 40rem;
      height: 3rem;
      .label {
        font-size: 1.5rem;
        font-weight: 500;
        color: #343434b5;
        margin-left: 0.5rem;
        display: block;
      }

      .input {
        width: 100%;
        height: 100%;
        font-size: 1.2rem;
        padding: 1rem 2rem;
        display: block;
        outline: none;
        border: none;
        border-radius: 1rem;
        background-color: #edededba;
        margin-top: 0.5rem;
      }
    }
  }
`;

const Input = styled.input``;
const Label = styled.label``;

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const userSignIn = async () => {
    try {
      const { email } = user;
      const response = await fetch(`${ServerApi}/api/auth/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
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
        setUser({
          email: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Container>
      <Box>
        <Div>
          <MainInputBox>
            <Box className="main-inputs">
            <Typography variant="h3" color="initial" sx={{fontWeight:"500",color:"#343434ba"}}>Forgot Password</Typography>
              <Item className="inputs">
                <Label htmlFor="email" className="label">
                  Email
                </Label>
                <Input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  value={user.email}
                  onChange={handleInput}
                ></Input>
              </Item>

              <Button
                variant="contained"
                sx={{ width: "100%", fontSize: "1.5rem" }}
                onClick={userSignIn}
              >
                Submit
              </Button>
              <Box>
                <Typography variant="h5">
                  create your account
                  <Link to={"/signup"} style={{ marginLeft: "0.5rem" }}>
                    Signup
                  </Link>
                </Typography>
              </Box>
            </Box>
          </MainInputBox>
        </Div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
