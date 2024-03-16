export const initialStatus = {
  statusId: "",
};
export const statusReducer = (state, action) => {
  switch (action.type) {
    case "STATUS_ID": {
      return {
        ...state,
        statusId: action.id,
      };
    }
  }
  return state;
};
