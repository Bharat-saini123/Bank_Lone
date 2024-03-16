export const initialLoanData = {
  loanValue: [],
};

export const loanDataReducer = (state, action) => {
  switch (action.type) {
    case "SALARY_LOAN": {
      const data = action.data.loanData;
      return {
        ...state,
        loanValue: data,
      };
    }
    case "BUSINESS_LOAN": {
      const data = action.data.loanData;
      return {
        ...state,
        loanValue: data,
      };
    }
    case "SELF_LOAN": {
      const data = action.data.loanData;
      return {
        ...state,
        loanValue: data,
      };
    }
  }
  return state;
};
