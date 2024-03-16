export const initialUser = {
  username: "",
  email: "",
  phone: "",
  imgUrl: "",
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_AUTH_USER": {
      const { _id, username, email, phone, imgUrl } = action.data.user;

      return {
        ...state,
        _id,
        username,
        email,
        phone,
        imgUrl,
      };
    }
    case "CHANGE_USER_VALUE": {
      const name = action.name;
      const value = action.value;
      return {
        ...state,
        [name]: value,
      };
    }
  }
  return state;
};
