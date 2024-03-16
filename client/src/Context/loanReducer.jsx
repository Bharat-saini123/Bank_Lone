export const initialLoan = {
 type: "",
};
export const loanReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LOAN_TYPE": {
      return {
        ...state,
        type: action.value,
      };
    }
  }
  return state;
};
