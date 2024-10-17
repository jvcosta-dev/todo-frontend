import React, { createContext, useContext } from "react";
import { Content } from "../interfaces";

interface ContentContextProps {
  content: Content;
}

const ContentContext = createContext<ContentContextProps | undefined>(
  undefined
);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context.content;
};

export const ContentProvider: React.FC<{
  content: Content;
  children: React.ReactNode;
}> = ({ content, children }) => {
  return (
    <ContentContext.Provider value={{ content }}>
      {children}
    </ContentContext.Provider>
  );
};
