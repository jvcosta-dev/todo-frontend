import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { ITask, ITaskInput } from "../interfaces";

export function useTasks() {
  const queryClient = useQueryClient();
  const { fetchWithAuth } = useAuth();

  const createTask = (data: ITaskInput) =>
    fetchWithAuth<null>("task", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/JSON",
      },
    }).then((res) => res);

  const getTasks = () => fetchWithAuth<ITask[]>("mytasks").then((res) => res);

  const getTaskById = (taskId: string) =>
    fetchWithAuth<ITask>(`task/${taskId}`).then((res) => res);

  const deleteTask = (taskId: string) =>
    fetchWithAuth<null>(`task/${taskId}`, { method: "DELETE" }).then(
      (res) => res
    );

  const checkTask = (taskId: string) =>
    fetchWithAuth<null>(`check/${taskId}`, { method: "PATCH" }).then(
      (res) => res
    );

  const editTask = ({ taskId, data }: { taskId: string; data: ITaskInput }) =>
    fetchWithAuth<null>(`task/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/JSON",
      },
    }).then((res) => res);

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const checkMutation = useMutation({
    mutationFn: checkTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const useTaskById = (taskId: string) => {
    return useQuery({
      queryKey: ["task", taskId],
      queryFn: () => getTaskById(taskId),
      enabled: !!taskId,
    });
  };

  return {
    tasks: data,
    isLoading,
    createTask: createMutation.mutate,
    deleteTask: deleteMutation.mutate,
    checkTask: checkMutation.mutate,
    editTask: editMutation.mutate,
    useTaskById,
  };
}
