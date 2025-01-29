import {
  Button,
  Form,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { BookHeart } from "lucide-react";
import { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
interface ModalNameProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
 
const ModalName: React.FC<ModalNameProps> = ({ onSubmit }) => {
  useEffect(() => {
    const storedData = localStorage.getItem("name");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (new Date().getTime() < parsedData.expirationTime) {
        toast.success(`Bem-vindo de volta, ${parsedData.name}!`);
      } else {
        localStorage.removeItem("name");
      }
    }
  }, []);

  return (
    <>
      <Form className="w-full" validationBehavior="native" onSubmit={onSubmit}>
        <ModalHeader className="flex flex-col gap-1 pb-0">
          Qual seu nome?
        </ModalHeader>
        <ModalBody className="w-full pt-0">
          <Input
            className="mt-0"
            isRequired
            errorMessage="Insira seu nome, por favor."
            endContent={
              <BookHeart className="text-2xl text-default-400 pointer-events-none" />
            }
            size="lg"
            labelPlacement="outside"
            label="Nome"
            variant="bordered"
            type="text"
            name="nameUser"
          />
        </ModalBody>
        <ModalFooter className="w-full flex justify-end">
          <Button type="submit" variant="solid" color="primary">
            Acessar
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
}

export default ModalName;
