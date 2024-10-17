import { Content } from "../interfaces";

const CACHE_KEY = "content";
const CACHE_TIME_KEY = "content_cache_time";
const CACHE_DURATION_MS = 1000 * 60 * 60;

export const fetchContent = async (): Promise<any[] | null> => {
  const cachedContent = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cachedContent && cachedTime) {
    const cachedTimeNumber = parseInt(cachedTime, 10);
    const isCacheValid = Date.now() - cachedTimeNumber < CACHE_DURATION_MS;

    if (isCacheValid) {
      return JSON.parse(cachedContent);
    }
  }

  try {
    const response = await fetch("http://localhost:3000/todotest");
    if (response.ok) {
      const data: any[] = await response.json();
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      return data;
    } else {
      console.error("Failed to fetch content");
      return null;
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};
