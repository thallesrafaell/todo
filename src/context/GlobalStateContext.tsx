// src/context/globalStateContext.tsx

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, actionTypes } from "./reducer";  // Importando o reducer e o estado inicial

// Contexto para o estado global
const GlobalStateContext = createContext<any>(null);

// Provider para fornecer o estado global
interface GlobalStateProviderProps {
  children: React.ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook personalizado para consumir o contexto global
export const useGlobalState = () => useContext(GlobalStateContext);

// Exemplo de como despachar ações
const addTask = (dispatch: React.Dispatch<any>, task: { id: number; name: string }) => {
  dispatch({ type: actionTypes.ADD_TASK, payload: task });
};
