import { Button, DatePicker, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";

interface ModalEditProps { 
  onClose: () => void;
  confirmFn: () => void;
}

export default function ModalEdit(props: ModalEditProps) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Alteração</ModalHeader>
      <ModalBody>
        <div className="w-full max-w-xl flex flex-row gap-4">
          <I18nProvider locale="pt-BR">
            <DatePicker
              className="max-w-xs"
              label="Selecione nova Data de implantação"
              labelPlacement="outside"
            />
          </I18nProvider>
        </div>
      </ModalBody>
      <ModalFooter className="w-full flex justify-end">
        <Button color="danger" variant="ghost" onPress={props.onClose}>
          Cancelar
        </Button>
        <Button
          color="success"
          variant="shadow"
          className="text-white"
          onPress={props.confirmFn}
        >
          Alterar
        </Button>
      </ModalFooter>
    </>
  );
}
