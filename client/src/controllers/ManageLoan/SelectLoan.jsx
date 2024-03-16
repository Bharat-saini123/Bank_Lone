import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AppContext } from "../../Context/Context";

export default function BasicSelect() {
  const [loan, setLoan] = React.useState("");
  const { getLoanData } = React.useContext(AppContext);
  const handleChange = (e) => {
    e.preventDefault();
    setLoan(e.target.value);
    getLoanData(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.5rem" }}>
          Loan Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="loan-data-type"
          value={loan}
          label="Loan Type"
          onChange={handleChange}
          sx={{ width: "20rem",fontSize:"1.5rem" }}
        >
          <MenuItem value={"salary"} sx={{ fontSize: "1.2rem" }}>
            Salaried
          </MenuItem>
          <MenuItem value={"business"} sx={{ fontSize: "1.2rem" }}>
            Business
          </MenuItem>
          <MenuItem value={"self"} sx={{ fontSize: "1.2rem" }}>
            Self Employed
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
