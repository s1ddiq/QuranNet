"use client";
// lib/GlobalStateContext.tsx
import React, { createContext, useState, useContext } from "react";

// Define the shape of the global state
interface GlobalState {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;

  repeatOnMistake: boolean;
  setRepeatOnMistake: React.Dispatch<React.SetStateAction<boolean>>;

  zenMode: boolean;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;

  showBismillah: boolean;

  setShowBismillah: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [fontSize, setFontSize] = useState(3);
  const [repeatOnMistake, setRepeatOnMistake] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        fontSize,
        setFontSize,
        repeatOnMistake,
        setRepeatOnMistake,
        zenMode,
        setZenMode,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
