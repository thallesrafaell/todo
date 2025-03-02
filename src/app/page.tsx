"use client";
import Header from "@/components/Header";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";

export default function Home() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Header />
    </>
  );
}
