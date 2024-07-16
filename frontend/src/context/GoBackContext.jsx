// context/GoBackContext.js
import React, { createContext, useContext, useState } from "react";

const BackContext = createContext();

export const useBackContext = () => {
  return useContext(BackContext);
};

const GoBackContext = ({ children }) => {
  const [backButton, setBackButton] = useState(false);
  return (
    <BackContext.Provider value={{ backButton, setBackButton }}>
      {children}
    </BackContext.Provider>
  );
};

export default GoBackContext;
