import { createContext, useReducer } from "react";
import { initialUser, userReducer } from "./userReducer";
import ServerApi from "../../ServerApi/ServerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loanReducer, initialLoan } from "./loanReducer";
import { loanDataReducer, initialLoanData } from "./loanDataReducer";
import { initialStatus, statusReducer } from "./statusReducer";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [AllUser, Dispatch] = useReducer(userReducer, initialUser);
  const [loanType, DispatchLoanType] = useReducer(loanReducer, initialLoan);
  const [loanData, DispatchLoanData] = useReducer(
    loanDataReducer,
    initialLoanData
  );
  const [loanUserStatus, DispatchLoanStatus] = useReducer(
    statusReducer,
    initialStatus
  );
  const getUserAllData = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/auth/user/getAuthUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    Dispatch({ type: "GET_AUTH_USER", data });
  };
 

  const getAllLoanData = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${ServerApi}/api/auth/user/getAllLoanData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `Barear ${token}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  };

  const getLoanData = (value) => {
    DispatchLoanType({ type: "CHANGE_LOAN_TYPE", value });
  };
  const getUserLoanData = async () => {
    const token = localStorage.getItem("token");
    if (loanType.type === "salary") {
      const response = await fetch(
        `${ServerApi}/api/auth/user/getSalaryLoanData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Barear ${token}`,
          },
          body: JSON.stringify({
            userType: loanType.type,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      return DispatchLoanData({ type: "SALARY_LOAN", data });
    }
    if (loanType.type === "business") {
  
      const response = await fetch(
        `${ServerApi}/api/auth/user/getBusinessLoanData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Barear ${token}`,
          },
          body: JSON.stringify({
            userType: loanType.type,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      return DispatchLoanData({ type: "BUSINESS_LOAN", data });
    }
    if (loanType.type === "self") {
      const response = await fetch(
        `${ServerApi}/api/auth/user/getSelfLoanData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `Barear ${token}`,
          },
          body: JSON.stringify({
            userType: loanType.type,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      return DispatchLoanData({ type: "SELF_LOAN", data });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...AllUser,
        Dispatch,
        AllUser,
        getUserAllData,
      
        getAllLoanData,
        getLoanData,
        loanType,
        DispatchLoanType,
        loanData,
        getUserLoanData,
        DispatchLoanData,
        DispatchLoanStatus,
        loanUserStatus,
        ...loanUserStatus,
        ...loanData,
        ...loanType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
