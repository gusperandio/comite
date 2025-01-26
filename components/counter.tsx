"use client";
import { useState } from "react";
import { Button } from "@heroui/button";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Button
      className="text-slate-50"
      color="success"
      variant="shadow"
      onPress={() => setCount(count + 1)}
    >
      Count is {count}
    </Button>
  );
};
