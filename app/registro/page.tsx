"use client";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { CircleMinus } from "lucide-react";
import { useState } from "react";

const callServer = (data: any) => {
  return {
    errors: {
      username: "Sorry, this username is taken.",
    },
  };
};

export default function Page() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.inputs) {
      setErrors({ inputs: "Necessário preencher" });
      return;
    }

    const result = callServer(data);

    setErrors(result.errors);
    onOpen();
    return;
  };

  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Form
        className="w-full max-w-xs flex flex-col gap-3"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          label="Fornecedor"
          labelPlacement="inside"
          name="inputs"
          radius="sm"
          variant="flat"
        />
        <Textarea
          isRequired
          className="max-w-xs"
          label="Demanda"
          name="inputs"
          labelPlacement="inside"
          placeholder="Escreva aqui sua demanda..."
        />
        <Input
          isRequired
          label="Analista"
          labelPlacement="inside"
          name="inputs"
          radius="sm"
          variant="flat"
        />
        <Input
          isRequired
          label="Aprovador HML"
          labelPlacement="inside"
          name="inputs"
          radius="sm"
          variant="flat"
        />
        <Input
          isRequired
          label="Desenvolvedor"
          labelPlacement="inside"
          name="inputs"
          radius="sm"
          variant="flat"
        />
        <Input
          isRequired
          label="Testes"
          labelPlacement="inside"
          name="inputs"
          radius="sm"
          variant="flat"
        />
        <div className="w-full max-w-xs flex flex-row gap-1 items-end">
          <I18nProvider locale="pt-BR">
            <DatePicker
              className="max-w-xs"
              size="lg"
              label="Data implantação"
              labelPlacement="outside"
            />
          </I18nProvider>
          <Tooltip content="Limpar Data">
            <Button
              isIconOnly
              aria-label="Like"
              color="danger"
              variant="light"
              className="mb-2"
              size="sm"
            >
              <CircleMinus size={18} />
            </Button>
          </Tooltip>
        </div>
        <Button type="submit" variant="solid" color="primary">
          Enviar
        </Button>
      </Form>
    </>
  );
}
