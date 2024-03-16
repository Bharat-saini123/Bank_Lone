import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Authentication/SignUp";
import SignIn from "./Authentication/SignIn";
import Home from "./controllers/Home";
import ForgotPassword from "./Authentication/ForgotPassword";
import UserProfile from "./controllers/UserProfile";
import UserInfoDiaLog from "./controllers/Dialogs/UserInfoDialog";
import LoanDrawer from "./controllers/Drawer/LoanDrawer";
import SalaryLoanDrawer from "./controllers/Drawer/SalaryLoanDrawer";
import SalaryLoanDrawerNext from "./controllers/Drawer/SalaryLoanDrawerNext";
import BusinessLoneDrawers from "./controllers/Drawer/BuisnessLoneDrawers";
import BusinessLoanDrawerNext from "./controllers/Drawer/BusinessLoneDrawerNext";
import SelfLoanDrawer from "./controllers/Drawer/SelfLoanDrawer";
import SelfLoanDrawerNext from "./controllers/Drawer/SelfLoanDrawerNext";
import ManageLoanDrawer from "./controllers/Drawer/ManageLoanDrawer";
import AdhaarSendOtpDrawer from "./controllers/Drawer/AdhaarSendOtpDrawer";
import AdhaarVerifyOtpDrawer from "./controllers/Drawer/AdhaarVerifyOtpDrawer";
import ChangePassword from "./Authentication/ChangePassword";
import PanSendInfoDrawer from "./controllers/Drawer/PanSendInfoDrawer";
import PanInfoVerifyDrawer from "./controllers/Drawer/PanInfoVerifyDrawer";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/userInfoDialog" element={<UserInfoDiaLog />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/loanDrawer" element={<LoanDrawer />} />
        <Route path="/salaryLoanDrawer" element={<SalaryLoanDrawer />} />
        <Route path="/salaryApplyLoanNext" element={<SalaryLoanDrawerNext />} />
        <Route path="/businessLoneDrawer" element={<BusinessLoneDrawers />} />
        <Route
          path="/businessLoneDrawerNext"
          element={<BusinessLoanDrawerNext />}
        />
        <Route path="/selfLoneDrawer" element={<SelfLoanDrawer />} />
        <Route path="/selfLoneDrawerNext" element={<SelfLoanDrawerNext />} />
        <Route path="/manageLoanDrawer" element={<ManageLoanDrawer />} />
        <Route path="/adhaarOtp" element={<AdhaarSendOtpDrawer />} />
        <Route path="/verifyAdhaarOtp" element={<AdhaarVerifyOtpDrawer />} />
        <Route path="/panSendInfo" element={<PanSendInfoDrawer />} />
        <Route path="/verifyPanInfo" element={<PanInfoVerifyDrawer />} />
        <Route
          path="/user/changePassword/:passwordToken/:passwordId"
          element={<ChangePassword />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
