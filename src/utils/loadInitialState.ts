import { Task } from "../context/reducer";



// Função para carregar o estado inicial do localStorage
export const loadInitialState = (): { tasks: Task[]; name: string } => {
  if (typeof window === "undefined") {
    // No servidor, retorne valores padrão ou um estado vazio
    return { tasks: [], name: "" };
  }
  const savedTasks = localStorage.getItem("USER_TASKS");
  const savedName = localStorage.getItem("USER_NAME");

  const tasks = savedTasks ? JSON.parse(savedTasks) : [];
  const name = savedName || ""; // Se não houver nome, retorna uma string vazia.
  return { tasks, name };
};
