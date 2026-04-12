'use client';
import { createContext, useContext, useState } from 'react';

const HelpContext = createContext();

export function HelpProvider({ children }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const toggleHelp = () => setIsHelpOpen(!isHelpOpen);

  return (
    <HelpContext.Provider value={{ isHelpOpen, setIsHelpOpen, toggleHelp }}>
      {children}
    </HelpContext.Provider>
  );
}

export const useHelp = () => useContext(HelpContext);