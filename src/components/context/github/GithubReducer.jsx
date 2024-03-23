export default function GithubReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "SET_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CLEAR_USERS": {
      return {
        ...state,
        user: [],
      };
    }
    default:
      return state;
  }
}
