// src/context/reducer.ts

// Tipando o estado (State)
export interface Task {
  id: number;
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
  priority: "Urgente" | "Alta" | "Média" | "Baixa";
  important: boolean;
  category: string;
}

interface State {
  name: string;
  tasks: Task[];
}

// Definindo as ações possíveis (Action)
interface Action {
  type: string;
  payload?: any;
}

// Estado inicial
export const initialState: State = {
  name: "",
  tasks: [],
};

// Tipos das ações
export const actionTypes = {
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  EDIT_TASK: "EDIT_TASK",
  GET_TASK_BY_ID: "GET_TASK_BY_ID",
  LOAD_TASKS: "LOAD_TASKS",
  SET_NAME: "SET_NAME",
} as const;

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_TASKS":
      return {
        ...state,
        tasks: action.payload, // Carrega as tarefas do localStorage
      };
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case actionTypes.REMOVE_TASK:
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("USER_TASKS", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };
    case actionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              ...action.payload,
            };
          }
          return task;
        }),
      };
    case actionTypes.GET_TASK_BY_ID:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id === action.payload),
      };
    case actionTypes.SET_NAME:
      localStorage.setItem("USER_NAME", action.payload); // Caso para atualizar o nome
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export const loadInitialState = (): Task[] => {
  const savedTasks = localStorage.getItem("USER_TASKS");
  if (savedTasks) {
    return JSON.parse(savedTasks); // Retorna as tarefas carregadas
  }
  return []; // Retorna um array vazio se não houver dados
};
