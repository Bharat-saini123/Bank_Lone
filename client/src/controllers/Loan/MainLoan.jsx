import { styled } from "styled-components";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Container = styled.div`
  .main-loan {
    .main-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
      .main-item {
        border: 1px solid #ededed96;
        padding: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        flex-direction: column;
        .buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        .loan-item {
          font-size: 1.5rem;
          font-weight: 500;
          color: #343434da;
        }
      }
    }
  }
`;
const Item = styled.div``;
const Div = styled.div``;

const MainLoan = () => {
  return (
    <Container>
      <Box className="main-loan">
        <Div className="main-box">
          <Div className="main-item">
            <Item className="loan-item"> SALARIED LOAN</Item>
            <Item className="buttons">
              <Link to={"/manageLoanDrawer"}>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "1.2rem" }}
              >
                Manage
              </Button>
              </Link>
              <Link to={"/salaryLoanDrawer"}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ fontSize: "1.2rem" }}
                >
                  Apply Loan
                </Button>
              </Link>
            </Item>
          </Div>
          <Div className="main-item">
            <Item className="loan-item"> BUSINESS LOAN </Item>
            <Item className="buttons">
              <Link to={"/manageLoanDrawer"}>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "1.2rem" }}
              >
                Manage
              </Button>
              </Link>
              <Link to={"/businessLoneDrawer"}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: "1.2rem" }}
              >
                Apply Loan
              </Button>
              </Link>
            </Item>
          </Div>
          <Div className="main-item">
            <Item className="loan-item"> SELF EMPLOYED PROFESSIONAL LOAN</Item>
            <Item className="buttons">
              <Link to={"/manageLoanDrawer"}>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "1.2rem" }}
              >
                Manage
              </Button>
              </Link>
              <Link to={"/selfLoneDrawer"}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: "1.2rem" }}
              >
                Apply Loan
              </Button>
              </Link>
            </Item>
          </Div>
        </Div>
      </Box>
    </Container>
  );
};

export default MainLoan;
