"use client";

import { Button, Flex, Input, MenuItem, Stack, Text } from "@chakra-ui/react";
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
import { Field } from "@/components/ui/field";
import { useRef } from "react";
import { BiEdit } from "react-icons/bi";
export default function ModalEditTask() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current}>
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
          <DialogTitle>Dialog Header</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="First Name">
              <Input placeholder="First Name" />
            </Field>
            <Field label="Last Name">
              <Input ref={ref} placeholder="Focus First" />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
