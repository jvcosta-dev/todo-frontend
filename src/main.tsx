import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { fetchContent } from "./utils/fetchContent";
import { Content } from "./interfaces";
import { ContentProvider } from "./contexts/ContentContext";
import { transformContentArrayToObject } from "./utils/transformContent";

function Index() {
  const [content, setContent] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const fetchedContent = await fetchContent();
      if (fetchedContent) {
        const transformedContent =
          transformContentArrayToObject(fetchedContent);
        setContent(transformedContent);
      }
      setLoading(false);
    };

    loadContent();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  const queryClient = new QueryClient();

  return (
    <ContentProvider content={content as Content}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route element={<Home />} path="/" />
            </Routes>
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </ContentProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
