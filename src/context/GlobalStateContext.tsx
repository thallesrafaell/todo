import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer"; // Importando o reducer e o estado inicial
import useLocalStorage from "@/hooks/useLocalStorage";
import { loadInitialState } from "@/utils/loadInitialState";

// Contexto para o estado global
const GlobalStateContext = createContext<any>(null);

// Provider para fornecer o estado global
interface GlobalStateProviderProps {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [storedTasks, setStoredTasks] = useLocalStorage();

  const initialState = {
    tasks: loadInitialState(), // Inicializa o estado com as tarefas carregadas
  };

  // Inicializa o reducer com o estado inicial
  const [state, dispatch] = useReducer(reducer, initialState);

  // Atualiza o estado global quando os dados do localStorage forem carregados
  useEffect(() => {
    if (storedTasks && storedTasks.length > 0) {
      console.log("Carregando tarefas do localStorage:", storedTasks);
      dispatch({ type: "LOAD_TASKS", payload: storedTasks }); 
    }
  }, [storedTasks]); 

  // Atualizar o localStorage sempre que as tarefas mudarem
  useEffect(() => {
    if (
      state.tasks.length > 0 &&
      JSON.stringify(state.tasks) !== JSON.stringify(storedTasks)
    ) {
      console.log("Salvando tarefas no localStorage:", state.tasks);
      setStoredTasks(state.tasks);
    }
  }, [state.tasks]); 

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook personalizado para consumir o contexto global
export const useGlobalState = () => useContext(GlobalStateContext);
