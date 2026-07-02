import React, { createContext, useContext, useState } from 'react';

interface NavVisibilityContextType {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const NavVisibilityContext = createContext<NavVisibilityContextType>({
  visible: true,
  setVisible: () => {},
});

export const NavVisibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);
  return (
    <NavVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </NavVisibilityContext.Provider>
  );
};

export const useNavVisibility = () => useContext(NavVisibilityContext);
