// hooks/useTasks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { ITask, ITaskInput } from "../interfaces";

export function useTasks() {
  const queryClient = useQueryClient();
  const { fetchWithAuth } = useAuth();

  const getTasks = () => fetchWithAuth<ITask[]>("mytasks").then((res) => res);

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createTask = (data: ITaskInput) =>
    fetchWithAuth<null>("task", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/JSON",
      },
    }).then((res) => res);

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks: data,
    isLoading,
    createTask: createMutation.mutate,
  };
}
