import AlertReducer from "./AlertReducer";
import { createContext } from "react";
import { useReducer } from "react";

const AlertContext = createContext();
export const AlertProvider = ({ children }) => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //   Set an Alert
  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_ALERT",
      });
    }, 3000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
