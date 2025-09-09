import React, { createContext, useState, useContext, useCallback } from "react";

const SharedDataContext = createContext();

export const SharedData = ({ children }) => {
  /* Dashboard dash variable, setDash(newDash) */
  const [dash, setDash] = useState(0);

  /* Save when setting variable */
  const saveDash = useCallback((oldDash, newDash) => {
    console.log("dash changed to", newDash);
    localStorage.setItem(
      "dash",
      JSON.stringify({ data: newDash, time: Date.now() })
    );
  }, []);

  const _Dash = (newDash) => {
    saveDash(dash, newDash);
    setDash(newDash);
  };

  /* Add more variables here */
  const [account, setAccount] = useState(null);

  const saveAccount = useCallback((oldAccount, newAccount) => {
    localStorage.setItem(
      "account",
      JSON.stringify({ data: newAccount, time: Date.now() })
    );
  }, []);

  const _Account = (newAccount) => {
    saveAccount(account, newAccount);
    setAccount(newAccount);
  };

  /* Initial Load */
  const initialLoad = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/whoami/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        if (!data.message) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        _Account(data);

        alert(`Auto signin`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  initialLoad();

  /* Every tab listens to events */
  window.addEventListener("storage", (event) => {
    if (event.key === "dash") {
      const data = JSON.parse(event.newValue);
      console.log("Data updated in another tab:", data);
      setDash(data.data);
    } else if (event.key === "account") {
      const data = JSON.parse(event.newValue);
      console.log("Data updated in another tab:", data);
      setAccount(data.data);
    }
  });

  /* Then add them here */
  return (
    <SharedDataContext.Provider
      value={{ dash, setDash: _Dash, account, setAccount: _Account }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};

export const useData = () => {
  return useContext(SharedDataContext);
};
