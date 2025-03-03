// src/context/reducer.ts

// Tipando o estado (State)
export interface Task {
    id: number;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt?: string;
    priority: "Urgente"| "Alta" | "Média" | "Baixa";
    important: boolean;
    category: string;
  }
  
  interface State {
    addVisible: boolean;
    tasks: Task[];
  }
  
  // Definindo as ações possíveis (Action)
  interface Action {
    type: string;
    payload?: any;  // Pode ser qualquer tipo, mas no caso de ADD_TASK e REMOVE_TASK, é um Task ou id
  }
  
  // Estado inicial
  export const initialState: State = {
    addVisible: false,
    tasks: [],
  };
  
  // Tipos das ações
  export const actionTypes = {
    ADD_TASK: "ADD_TASK",
    REMOVE_TASK: "REMOVE_TASK",
  } as const;
  
  // Redefinindo o reducer com o tipo correto de estado e ação
  export const reducer = (state: State, action: Action): State => {
    switch (action.type) {      
      case actionTypes.ADD_TASK:
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case actionTypes.REMOVE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
        };
      default:
        return state;
    }
  };
  