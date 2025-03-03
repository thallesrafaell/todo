import { useState, useEffect } from "react";
import { Task } from "../context/reducer";

const LOCAL_STORAGE_KEY = "USER_TASKS"; // Chave para o localStorage

const useLocalStorage = (): [Task[], (tasks: Task[]) => void] => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Carrega as tarefas do localStorage quando o componente for montado
  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log("Dados carregados do localStorage:", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Atualiza o estado com as tarefas do localStorage
    }
  }, []); 

  // Salva as tarefas no localStorage sempre que o estado de tarefas mudar
  useEffect(() => {
    console.log("Dados salvos no localStorage:", tasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]); // Executa sempre que `tasks` mudar

  return [tasks, setTasks];
};

export default useLocalStorage;