import { styled } from "styled-components";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";

const Container = styled.div`
  .main-table {
    margin-top: 3rem;
    .main-table-box {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1rem;
      .table-item {
        .table-data {
          font-size: 2rem;
          font-weight: 500;
          color: #343434a7;
          text-transform: capitalize;
        }
        .table-item-data {
          font-size: 1.5rem;
          color: #343434a7;
        }
      }
    }
  }
`;
const Div = styled.div``;
const Item = styled.div``;

const ManageTable = () => {
  const navigate = useNavigate();
  const { phone, type, loanValue, DispatchLoanStatus } = useContext(AppContext);
  const sendPanInfoStatusFunction = (id) => {
    navigate("/panSendInfo");
    DispatchLoanStatus({ type: "STATUS_ID", id });
  };
  const sendAdhaarInfoStatusFunction = (id) => {
    navigate("/adhaarOtp");
    DispatchLoanStatus({ type: "STATUS_ID", id });
  };
  return (
    <Container>
      <Box className="main-table">
        <Div className="main-table-box">
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              name
            </Typography>
          </Item>
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              Phone
            </Typography>
          </Item>
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              loan Type
            </Typography>
          </Item>
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              Loan Status
            </Typography>
          </Item>
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              Pan card verification
            </Typography>
          </Item>
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              Adhaar card verification
            </Typography>
          </Item>
          <Item className="table-item">
            <Typography variant="p" color="initial" className="table-data">
              Request Approval
            </Typography>
          </Item>
        </Div>
        <hr />
      </Box>
      <Box sx={{ height: "40rem", overflowY: "scroll" }}>
        {loanValue
          ? loanValue.map((Ele, index) => {
              return (
                <>
                  <Box
                    className="main-table"
                    sx={{ paddingBottom: "3rem" }}
                    key={index}
                  >
                    <Div className="main-table-box">
                      <Item className="table-item">
                        <Typography
                          variant="p"
                          color="initial"
                          className="table-item-data"
                        >
                          {Ele.username}
                        </Typography>
                      </Item>
                      <Item className="table-item">
                        <Typography
                          variant="p"
                          color="initial"
                          className="table-item-data"
                        >
                          {phone}
                        </Typography>
                      </Item>
                      <Item className="table-item">
                        {Ele.userType === "salary" ? (
                          <Typography
                            variant="p"
                            color="initial"
                            className="table-item-data"
                          >
                            Salaried
                          </Typography>
                        ) : Ele.userType === "self" ? (
                          <Typography
                            variant="p"
                            color="initial"
                            className="table-item-data"
                          >
                            Self Employed
                          </Typography>
                        ) : (
                          <Typography
                            variant="p"
                            color="initial"
                            className="table-item-data"
                          >
                            Business
                          </Typography>
                        )}
                      </Item>
                      <Item className="table-item">
                        <Typography
                          variant="p"
                          color="initial"
                          className="table-item-data"
                        >
                          {Ele.loanStatus === "pending" ? (
                            <Tooltip
                              title={
                                <p
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Click here to verify Status
                                </p>
                              }
                            >
                              <Button variant="contained" color="warning">
                                {Ele.loanStatus}
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title={
                                <p
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Status verified
                                </p>
                              }
                            >
                              <Button
                                variant="contained"
                                color="success"
                                sx={{ cursor: "text" }}
                              >
                                {Ele.loanStatus}
                              </Button>
                            </Tooltip>
                          )}
                        </Typography>
                      </Item>
                      <Item className="table-item">
                        <Typography
                          variant="p"
                          color="initial"
                          className="table-item-data"
                        >
                          {Ele.panStatus === "pending" ? (
                            <Tooltip
                              title={
                                <p
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Click here to verify PAN
                                </p>
                              }
                            >
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                  sendPanInfoStatusFunction(Ele._id)
                                }
                              >
                                {Ele.panStatus}
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title={
                                <p
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  PAN Card verified
                                </p>
                              }
                            >
                              <Button
                                variant="contained"
                                color="success"
                                sx={{ cursor: "text" }}
                              >
                                {Ele.panStatus}
                              </Button>
                            </Tooltip>
                          )}
                        </Typography>
                      </Item>
                      <Item className="table-item">
                        <Typography
                          variant="p"
                          color="initial"
                          className="table-item-data"
                        >
                          {Ele.adhaarStatus === "pending" ? (
                            <Tooltip
                              title={
                                <p
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Click here to verify Adhaar
                                </p>
                              }
                            >
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                  sendAdhaarInfoStatusFunction(Ele._id)
                                }
                              >
                                {Ele.adhaarStatus}
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title={
                                <p
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Adhaar Card Verified
                                </p>
                              }
                            >
                              <Button
                                variant="contained"
                                color="success"
                                sx={{ cursor: "text" }}
                              >
                                {Ele.adhaarStatus}
                              </Button>
                            </Tooltip>
                          )}
                        </Typography>
                      </Item>
                      <Item className="table-item">
                        <Typography
                          variant="p"
                          color="initial"
                          className="table-item-data"
                        >
                          <Button variant="outlined" color="warning">
                            pending
                          </Button>
                        </Typography>
                      </Item>
                    </Div>
                  </Box>
                  <hr />
                </>
              );
            })
          : ""}
      </Box>
    </Container>
  );
};

export default ManageTable;
