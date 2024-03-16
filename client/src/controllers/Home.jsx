import { styled } from "styled-components";
import PersistentDrawerLeft from "./Drawer/Drawer";
import SignIn from "../Authentication/SignIn";

const Container = styled.div``;

const Home = () => {
  const token = localStorage.getItem("token");
  const MainHome = () => {
    if (token) {
      return <PersistentDrawerLeft />;
    } else {
      return <SignIn />;
    }
  };

  return (
    <Container>
      <MainHome />
    </Container>
  );
};

export default Home;
