import React, {createContext, useState, useContext} from 'react';

const CerrarSesionContext = createContext();

export const CerrarSesionProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); 

  return (
    <CerrarSesionContext.Provider
      value={{isAuthenticated, setIsAuthenticated, loggedIn, setLoggedIn}}>
      {children}
    </CerrarSesionContext.Provider>
  );
};

export const useCerrarSesion = () => useContext(CerrarSesionContext);
