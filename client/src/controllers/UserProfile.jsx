import { styled } from "styled-components";
import Avatar from "@mui/material/Avatar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/Context";
import ServerApi from "../../ServerApi/ServerApi";
import { useRef } from "react";

const Container = styled.div``;
const Figure = styled.figure`
  width: 40rem;
  height: 40rem;
  .image {
    width: 100%;
    height: 100%;
    display: inline-block;
    object-fit: contain;
    object-position: center;
  }
`;
const Div = styled.div`
  .main-image {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5rem;
  }
`;
const Item = styled.div``;
const UserInformationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem;
  width: 80%;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  border: 2px solid #3434341c;
  .main-user-information {
    .main-user-info {
      margin-top: 1rem;
      .user-items {
        font-size: 2rem;
      }
    }
  }
`;

const UserProfile = () => {
  const { username, email, phone, imgUrl } = useContext(AppContext);
  const { getUserAllData } = useContext(AppContext);
  const fileRef = useRef(null);
  const ProfileFunction = () => {
    fileRef.current.click();
  };
  const changeProfilePhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload_image", e.target.files[0]);
    const token = localStorage.getItem("token");
    await fetch(`${ServerApi}/api/file/imageUpdate`, {
      method: "POST",
      headers: {
        token: `Barear ${token}`,
      },
      body: formData,
    });
  };
  useEffect(() => {
    getUserAllData();
  }, []);

  return (
    <Container>
      <Link
        style={{
          textDecoration: "none",
          marginTop: "4rem",
          marginLeft: "2rem",
          display: "inline-block",
          marginBottom:"1rem"
        }}
        to={"/"}
      >
        <Button variant="contained" sx={{ fontSize: "1.5rem" }}>
          Dashboard
        </Button>
      </Link>
      <hr />
      <Typography
        variant="h3"
        color="initial"
        sx={{ textAlign: "center", margin: "3rem 0rem" }}
      >
        Profile
      </Typography>
      <hr />
      <Div>
        <Item className="main-image">
          <Figure className="figure">
            <Avatar
              src={`${ServerApi}/image/images/${imgUrl}`}
              className="image"
            ></Avatar>
          </Figure>
          <Tooltip
            title={
              <p style={{ padding: "0.6rem 1rem", fontSize: "1.2rem" }}>
                Edit Image
              </p>
            }
          >
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="edit-main"
              onClick={ProfileFunction}
            >
              <Typography
                variant="h5"
                color="initial"
                sx={{ color: "#fff", fontSize: "1.5rem" }}
              >
                Edit Image
              </Typography>
              <ModeEditIcon
                sx={{ color: "#fff", fontSize: "2rem", marginLeft: "0.5rem" }}
              />
            </Button>
          </Tooltip>
        </Item>
      </Div>

      <UserInformationContainer>
        <Div className="main-user-information">
          <Div className="main-user-info">
            <Item className="user-items">Username : {username}</Item>
          </Div>
          <Div className="main-user-info">
            <Item className="user-items">Email : {email}</Item>
          </Div>
          <Div className="main-user-info">
            <Item className="user-items">Phone : {phone}</Item>
          </Div>
        </Div>
        <Tooltip
          title={
            <p style={{ padding: "0.6rem 1rem", fontSize: "1.2rem" }}>
              Edit Info{" "}
            </p>
          }
        >
          <Link to={"/userInfoDialog"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="edit-main"
            >
              <Typography
                variant="h5"
                color="initial"
                sx={{ color: "#fff", fontSize: "1.5rem" }}
              >
                Edit Info
              </Typography>
              <ModeEditIcon
                sx={{ color: "#fff", fontSize: "2rem", marginLeft: "0.5rem" }}
              />
            </Button>
          </Link>
        </Tooltip>
      </UserInformationContainer>
      <input
        type="file"
        onChange={changeProfilePhoto}
        ref={fileRef}
        style={{ display: "none" }}
      />
    </Container>
  );
};

export default UserProfile;
