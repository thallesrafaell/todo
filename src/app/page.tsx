"use client";
import Login from "@/components/Login";
import { GlobalStateProvider } from "@/context/GlobalStateContext";


export default function App() {
  
  return (
    <GlobalStateProvider>
      <Login />
    </GlobalStateProvider>
  );
}
