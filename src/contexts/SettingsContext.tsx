import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextType {
  darkMode: boolean;
  switchDarkMode: () => void;
  primaryColor: primaryColor;
  changePrimaryColor: (primaryColor: primaryColor) => void;
}

export type primaryColor = {
  name: string;
  color: string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState<primaryColor>(() => {
    const savedPrimaryColor = localStorage.getItem("primaryColor");
    return savedPrimaryColor
      ? JSON.parse(savedPrimaryColor)
      : { name: "Todo Blue", color: "#2b91ff" };
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      primaryColor.color
    );
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [darkMode]);

  const switchDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const changePrimaryColor = (primaryColor: primaryColor) => {
    setPrimaryColor(primaryColor);
    localStorage.setItem("primaryColor", JSON.stringify(primaryColor));
    document.documentElement.style.setProperty(
      "--color-primary",
      primaryColor.color
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        primaryColor,
        changePrimaryColor,
        darkMode,
        switchDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
