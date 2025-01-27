"use client";
/* eslint-disable import/order */
import socket from "../lib/socket/socket";
import { I18nProvider } from "@react-aria/i18n";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell, 
  DatePicker,
} from "@heroui/react";
import { Clock, X, Pencil } from "lucide-react";
import { Loader } from "@/components/loader"; 

const INITIAL_VISIBLE_COLUMNS = [
  "project",
  "type",
  "who",
  "supp",
  "demand",
  "analist",
  "aprov",
  "dev",
  "test",
  "date",
  "imp",
];

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [reproved, setReproved] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [admin, setAdmin] = useState(true);

  const columns = [
    { uid: "project", name: "Projeto" },
    { uid: "type", name: "Tipo" },
    { uid: "who", name: "Quem Aplica" },
    { uid: "supp", name: "Fornecedor" },
    { uid: "demand", name: "Demanda" },
    { uid: "analist", name: "Analista" },
    { uid: "aprov", name: "Aprovador HML" },
    { uid: "dev", name: "desenvolvedor" },
    { uid: "test", name: "Testes" },
    { uid: "date", name: "Data Implantação" },
    { uid: "imp", name: "Implantação" },
  ];

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(
        admin
          ? new Set(INITIAL_VISIBLE_COLUMNS)
          : new Set(INITIAL_VISIBLE_COLUMNS.slice(0, -1))
      ).includes(column.uid)
    );
  }, []);

  useEffect(() => {
    socket.on("message", (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.on("showModal", () => {
      onOpen();
    });
    return () => {
      socket.off("showModal");
    };
  }, [isOpen]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  interface FakeData {
    key: string;
    project: string;
    type: string;
    who: string;
    supp: string;
    demand: string;
    analist: string;
    aprov: string;
    dev: string;
    test: string;
    date: string;
    imp: string | undefined;
  }

  const TimerFn = () => {
    const [time, setTime] = useState(5);

    useEffect(() => {
      if (time > 0) {
        const timerId = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
      } else if (time === 0) {
        onClose();
        setReproved(true);
        setInterval(() => {
          setReproved(false);
        }, 7000);
        return;
      }
    }, [time]);

    return (
      <div className="flex flex-row items-center justify-start gap-4">
        <Loader /> 00:{String(time).padStart(2, "0")}
      </div>
    );
  };

  const ConfirmFn = () => {
    onClose();
  };

  const ReproveFn = () => {
    onClose();
  };

  const rows: FakeData[] = [
    {
      key: "1",
      project: "db-manutencao-0.0.18",
      type: "normal - SVN",
      who: "Barnabe Silva",
      supp: "tempN2",
      demand:
        "REQ-22 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and.",
      analist: "Marcela Sabino",
      aprov: "Marcela Sabino",
      dev: "Maria Silva",
      test: "Maria Silva",
      date: " - ",
      imp: undefined,
    },
    {
      key: "2",
      project: "db-manutencao-0.0.18",
      type: "normal - SVN",
      who: "Barnabe Silva",
      supp: "tempN2",
      demand:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      analist: "Marcela Sabino",
      aprov: "Marcela Sabino",
      dev: "Maria Silva",
      test: "Maria Silva",
      date: " - ",
      imp: undefined,
    },
    {
      key: "3",
      project: "db-manutencao-0.0.18",
      type: "normal - SVN",
      who: "Barnabe Silva",
      supp: "tempN2",
      demand:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      analist: "Marcela Sabino",
      aprov: "Marcela Sabino",
      dev: "Maria Silva",
      test: "Maria Silva",
      date: " - ",
      imp: undefined,
    },
    {
      key: "4",
      project: "db-manutencao-0.0.18",
      type: "normal - SVN",
      who: "Barnabe Silva",
      supp: "tempN2",
      demand:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      analist: "Marcela Sabino",
      aprov: "Marcela Sabino",
      dev: "Maria Silva",
      test: "Maria Silva",
      date: " - ",
      imp: undefined,
    },
    {
      key: "5",
      project: "db-manutencao-0.0.18",
      type: "normal - SVN",
      who: "Barnabe Silva",
      supp: "tempN2",
      demand:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      analist: "Marcela Sabino",
      aprov: "Marcela Sabino",
      dev: "Maria Silva",
      test: "Maria Silva",
      date: " - ",
      imp: undefined,
    },
  ];

  const renderCell = React.useCallback(
    (row: FakeData, columnKey: React.Key) => {
      const cellValue = row[columnKey as keyof FakeData];

      switch (columnKey) {
        case "imp":
          return (
            <div className="flex flex-row gap-2 justify-center">
              <Button
                color="default"
                variant="ghost"
                size="sm"
                endContent={<Pencil />}
                onPress={() => {
                  onOpen();
                  socket.emit("showModal");
                }}
              ></Button>
              <Button
                size="sm"
                color="primary"
                variant="shadow"
                endContent={<Clock />}
                onPress={() => {
                  onOpen();
                  socket.emit("showModal");
                }}
              ></Button>
            </div>
          );
        case "date":
          return <div className="w-[100px] text-center">25/05/1997</div>;
        case "demand":
          return <div className="w-[200px]">{cellValue}</div>;
        default:
          return cellValue;
      }
    },
    []
  );

  const modalCount = (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <TimerFn /> db-manutencao-0.0.18
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
          onPress={onClose}
          endContent={<X />}
        >
          Reprovar
        </Button>
        <Button
          color="success"
          variant="shadow"
          className="text-white"
          onPress={ConfirmFn}
        >
          Aprovar
        </Button>
      </ModalFooter>
    </>
  );

  const modalEdit = (
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
        <Button
          color="danger"
          variant="ghost"
          onPress={onClose} 
        >
          Cancelar
        </Button>
        <Button
          color="success"
          variant="shadow"
          className="text-white"
          onPress={ConfirmFn}
        >
          Alterar
        </Button>
      </ModalFooter>
    </>
  );

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"}>
        <ModalContent>{(onClose) => <>{modalEdit}</>}</ModalContent>
      </Modal>

      <div className="flex flex-col gap-3">
        {reproved ? (
          <>
            <h1 className="text-red-500">Marcio reprovou</h1>
          </>
        ) : (
          <></>
        )}

        <Table fullWidth={true}>
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.uid}>
                {column.name.toUpperCase()}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
