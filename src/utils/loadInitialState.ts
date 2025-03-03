import { Task } from "../context/reducer";

const LOCAL_STORAGE_KEY = "USER_TASKS"; // Chave para o localStorage

// Função para carregar o estado inicial do localStorage
export const loadInitialState = (): Task[] => {
  const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedTasks) {
    return JSON.parse(savedTasks); // Retorna as tarefas carregadas
  }
  return []; // Retorna um array vazio se não houver dados
};