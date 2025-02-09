// context/ToggleContext.js
import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <ToggleContext.Provider value={{ isActivated, setIsActivated }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggleContext must be used within a ToggleProvider");
  }
  return context;
};
