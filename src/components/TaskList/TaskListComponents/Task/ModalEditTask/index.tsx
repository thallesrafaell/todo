"use client";

import { Button, Flex, Input, NativeSelect, Stack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

import { Field } from "@/components/ui/field";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

import { TaskProps } from "..";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function ModalEditTask({
  id,
  name,
  createdAt,
  priority,
  important,
  category,
  done,
}: TaskProps) {
  const { dispatch } = useGlobalState();

  const [editedName, setEditedName] = useState(name);
  const [editedPriority, setEditedPriority] = useState<
    "Urgente" | "Alta" | "Média" | "Baixa"
  >(priority);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedImportant, setEditedImportant] = useState(important);
  const [editedDone] = useState(done);

  const handleEditTask = () => {
    console.log("Editando tarefa", {
      id,
      editedName,
      editedPriority,
      editedImportant,
      editedCategory,
      editedDone,
    });
    // Atualiza a tarefa com os novos valores
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id,
        name: editedName,
        priority: editedPriority,
        important: editedImportant,
        category: editedCategory,
        updatedAt: new Date().toISOString(),
        createdAt,
        done: editedDone,
      },
    });
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Flex
          gap={2}
          alignItems="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        >
          <BiEdit />
        </Flex>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Titulo">
              <Input
                placeholder="Title"
                defaultValue={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Field>
            <Field label="Prioridade">
              <NativeSelect.Root
                size="sm"
                width="240px"
                defaultValue={editedPriority}
                onChange={(event) =>
                  setEditedPriority(
                    (event.target as HTMLSelectElement).value as
                      | "Urgente"
                      | "Alta"
                      | "Média"
                      | "Baixa"
                  )
                }
              >
                <NativeSelect.Field placeholder="Select option">
                  <option value="Urgente">Urgente</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field>
            <Field label="Categoria">
              <NativeSelect.Root
                size="sm"
                width="240px"
                defaultValue={editedCategory}
                onChange={(event) =>
                  setEditedCategory((event.target as HTMLSelectElement).value)
                }
              >
                <NativeSelect.Field placeholder="Selecione a categoria">
                  <option value="Saúde">Saúde</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Estudo">Estudo</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Outros">Outros</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field>

            <Checkbox
              defaultChecked={editedImportant}
              colorPalette={"blue"}
              onChange={() => setEditedImportant(!editedImportant)}
            >
              Importante
            </Checkbox>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="red" variant="outline">
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button colorPalette="blue" onClick={handleEditTask}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
