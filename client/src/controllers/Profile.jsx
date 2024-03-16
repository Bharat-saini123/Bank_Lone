import { styled } from "styled-components";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { AppContext } from "../Context/Context";
import ServerApi from "../../ServerApi/ServerApi";

const Container = styled.div``;

const ProfileImage = () => {
  const { imgUrl, username } = useContext(AppContext);

  return (
    <Container>
      <Tooltip
        title={
          <p style={{ padding: "0.6rem 1rem", fontSize: "1.2rem" }}>
            Profile image
          </p>
        }
      >
        <Avatar
          src={`${ServerApi}/image/images/${imgUrl}`}
          sx={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
            cursor: "pointer",
          }}
        />

        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {username}
        </Typography>
      </Tooltip>
    </Container>
  );
};

export default ProfileImage;
