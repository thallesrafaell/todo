"use client";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Box, Flex, Input, Text, Button } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { FaCheck } from "react-icons/fa";
import { InputGroup } from "../ui/input-group";
import { LuUser } from "react-icons/lu";
import { useRouter } from "next/navigation"; 


export default function Login() {
  const { state, dispatch } = useGlobalState();
  const router = useRouter(); 
  const [name, setName] = useState("");
  


  useEffect(() => {
    // O redirecionamento no useEffect agora é controlado apenas se o nome estiver presente no estado global.
    if (state.name) {
      router.push("/todo");
    }
  }, [state.name, router]);

  const handleNameChange = (name: string) => {
    dispatch({
      type: "SET_NAME",
      payload: name,
    });
  };

  const handleLogin = () => {
    if (name) {
      
      dispatch({
        type: "SET_NAME",
        payload: name,
      });
      router.push("/todo");
    }
  };

  return (
    <Box
      display="flex"
      minH="100vh"
      width="100vw"
      bg={useColorModeValue("gray.50", "gray.900")}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={4}
    >
      <Flex alignItems="center" justifyContent="center" gap={4} mb={6}>
        <FaCheck color="blue" size={40} />
        <Text textStyle="4xl" fontWeight="bold" color="blue">
          Todo
        </Text>
      </Flex>

      <Text
        textStyle="2xl"
        color={useColorModeValue("black", "white")}
        mt={4}
        mb={8}
      >
        Bem-vindo ao Todo App
      </Text>

      <InputGroup width="100%" maxW="300px" startElement={<LuUser />}>
        <Input
          placeholder="Digite Seu Nome"
          onChange={(e) => setName(e.target.value)}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("black", "white")}
          _placeholder={{ color: useColorModeValue("gray.400", "gray.500") }}
          borderColor={useColorModeValue("gray.300", "gray.600")}
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500" }}
        />
      </InputGroup>

      {name && (
        <Text mt={4} color="blue.500">
          Olá, {name}!
        </Text>
      )}

      <Button
        mt={6}
        colorPalette="blue"
        onClick={() => {
          handleNameChange(name);
          handleLogin();
        }}
        disabled={!name} 
      >
        Entrar
      </Button>
    </Box>
  );
}
