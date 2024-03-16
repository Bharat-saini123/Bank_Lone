import { styled } from "styled-components";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ServerApi from "../../ServerApi/ServerApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const userSignup = async () => {
    try {
      const { username, email, phone, password, password_confirmation } = user;
      const response = await fetch(`${ServerApi}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
          password_confirmation,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success !== true) {
        for (let message of data.status) {
          toast.error(message.message, {
            autoClose: 2000,
          });
        }
      } else {
        localStorage.setItem("token", data.token);
        toast.success(data.message, {
          autoClose: 2000,
        });
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
        });
        navigate("/");
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
              <Item className="inputs">
                <Label htmlFor="username" className="label">
                  Username
                </Label>
                <Input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="username"
                  value={user.username}
                  onChange={handleInput}
                  autoComplete="off"
                ></Input>
              </Item>

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
                  autoComplete="off"
                ></Input>
              </Item>
              <Item className="inputs">
                <Label htmlFor="phone" className="label">
                  Phone
                </Label>
                <Input
                  className="input"
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  id="phone"
                  value={user.phone}
                  onChange={handleInput}
                  autoComplete="off"
                ></Input>
              </Item>
              <Item className="inputs">
                <Label htmlFor="password" className="label">
                  Password
                </Label>
                <Input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  value={user.password}
                  onChange={handleInput}
                  autoComplete="off"
                ></Input>
              </Item>
              <Item className="inputs">
                <Label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </Label>
                <Input
                  className="input"
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  value={user.password_confirmation}
                  onChange={handleInput}
                  autoComplete="off"
                ></Input>
              </Item>
              <Typography variant="h5">
                <Link
                  to={"/forgot"}
                  style={{
                    display: "inline-block",
                    marginTop: ".1rem",
                    marginLeft: "28rem",
                  }}
                >
                  Forgot Password
                </Link>
              </Typography>
              <Button
                variant="contained"
                sx={{ width: "100%", fontSize: "1.5rem" }}
                onClick={userSignup}
              >
                Sign Up
              </Button>
              <Box>
                <Typography variant="h5">
                  if you already signup <Link to={"/login"}>Login</Link>
                </Typography>
              </Box>
            </Box>
          </MainInputBox>
        </Div>
      </Box>
    </Container>
  );
};

export default SignUp;
