import { Button, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { Timer } from "./Timer";
import { X } from "lucide-react";

interface ModalCountProps { 
  confirmFn: () => void;
  reproveFn: () => void;
  onClose: () => void;
}

export default function ModalCount(props: ModalCountProps) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <Timer onClose={props.onClose}/> db-manutencao-0.0.18
      </ModalHeader>
      <ModalBody>
        <p>
          REQ-22 - alterando um card onde estava com erro e implementado toda
          caracterestica do card
        </p>
      </ModalBody>
      <ModalFooter className="w-full flex justify-between">
        <Button
          color="danger"
          variant="ghost"
          onPress={props.reproveFn}
          endContent={<X />}
        >
          Reprovar
        </Button>
        <Button
          color="success"
          variant="shadow"
          className="text-white"
          onPress={props.confirmFn}
        >
          Aprovar
        </Button>
      </ModalFooter>
    </>
  );
}
