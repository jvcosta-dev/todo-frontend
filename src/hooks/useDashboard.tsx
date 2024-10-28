import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { Dashboard } from "../interfaces";

export function useDashBoard(init: string, end: string) {
  const { fetchWithAuth } = useAuth();

  const getDashboard = async () => {
    const res = await fetchWithAuth<Dashboard>(
      `dashboard?init=${init}&end=${end}`
    );
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    enabled: !!init && !!end,
  });

  return {
    data,
    isLoading,
  };
}
