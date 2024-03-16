import { styled } from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import BasicSelect from "./SelectLoan";
import ManageTable from "./ManageTable";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";

const Container = styled.div`
  background-color: #fff;
  padding: 7rem;
`;
const Div = styled.div`
  .manage-filter-box {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 3rem 0rem;
  }
`;
const Item = styled.div``;
// const Input = styled.input``;
// const Label = styled.label``;

const MainManageLoan = () => {
const {getUserLoanData}=useContext(AppContext);

  return (
    <Container>
      <Typography variant="h3" color="initial" sx={{ textAlign: "center" }}>
        Manage Loan
      </Typography>
      <hr />
      <Box>
        <Div>
          <Item className="manage-filter-box">
            <BasicSelect />
            <Button variant="contained" color="info" sx={{fontSize:"1.5rem"}} onClick={getUserLoanData}>
              Filter
            </Button>
          </Item>
          <Item>
            <hr />
          </Item>
          <Item>
            <ManageTable/>
          </Item>
        </Div>
      </Box>
    </Container>
  );
};

export default MainManageLoan;
