import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ITodo } from "../types/rqTypes";

const axiosInstance = axios.create({ baseURL: "http://localhost:3557" });

const useQueryTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axiosInstance.get("/todos");
      return res.data;
    },
  });
};

const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: ITodo) => {
      return await axiosInstance.post("/todos", todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo: ITodo) => {
      return await axiosInstance.patch(`/todos/${todo.id}`, todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await axiosInstance.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export { useQueryTodos, useAddTodo, useUpdateTodo, useDeleteTodo };
