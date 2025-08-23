import React, { createContext, useState, useContext, useCallback } from "react";

const SharedDataContext = createContext();

export const SharedData = ({ children }) => {
  /* Dashboard dash variable, setDash(newDash) */
  const [dash, setDash] = useState(0);

  /* Save when setting variable */
  const saveDash = useCallback((oldDash, newDash) => {
    if (oldDash !== 0) {
      console.log("dash changed to", newDash);
    }
  }, []);

  const _Dash = (newDash) => {
    saveDash(dash, newDash);
    setDash(newDash);
  };

  /* Add more variables here */

  /* Then add them here */
  return (
    <SharedDataContext.Provider value={{ dash, setDash: _Dash }}>
      {children}
    </SharedDataContext.Provider>
  );
};

export const useData = () => {
  return useContext(SharedDataContext);
};
