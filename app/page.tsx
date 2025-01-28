"use client";
/* eslint-disable import/order */
import toast, { Toaster } from "react-hot-toast";
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
  Input,
  Form,
} from "@heroui/react";
import { Clock, X, Pencil, BookHeart } from "lucide-react";
import { Loader } from "@/components/loader";
import { FakeData } from "@/types";

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
    show: true,
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
    show: false,
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
    show: false,
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
    show: false,
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
    show: false,
  },
];

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [admin, setAdmin] = useState(true);
  const [updatedRows, setUpdatedRows] = useState<FakeData[]>(rows);

  const updateShowStatus = () => {
    setUpdatedRows((prevRows) => {
      const currentIndex = prevRows.findIndex((row) => row.show);
      if (currentIndex !== -1) {
        const newRows = [...prevRows];
        newRows[currentIndex].show = false;
        const nextIndex = currentIndex + 1;
        newRows[nextIndex].show = true;
        if (nextIndex === 0) {
          alert("Reached the end of the list, starting over.");
        }
        return newRows;
      }
      return prevRows;
    });
  };

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
    socket.on("approved", (data: string) => {
      toast.success(`${data}`);
    });

    return () => {
      socket.off("approved");
    };
  }, []);

  useEffect(() => {
    socket.on("refused", (data: string) => {
      toast.error(`${data}`);
    });

    return () => {
      socket.off("refused");
    };
  }, []);

  useEffect(() => {
    socket.on("noVote", (data: string) => {
      toast(data, {
        icon: "⚠️",
      });
    });

    return () => {
      socket.off("noVote");
    };
  }, []);

  useEffect(() => {
    socket.on("showModal", () => {
      onOpen();
    });

    return () => {
      socket.off("showModal");
    };
  }, []);

  const TimerFn = () => {
    const [time, setTime] = useState(7);

    useEffect(() => {
      if (time > 0) {
        const timerId = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
      } else if (time === 0) {
        onClose();
        socket.emit("noVote", userName);
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
    socket.emit("approved", userName);
    onClose();
  };

  const ReproveFn = () => {
    socket.emit("refused", userName);
    onClose();
  };

  const renderCell = React.useCallback(
    (row: FakeData, columnKey: React.Key) => {
      const cellValue = row[columnKey as keyof FakeData];
      switch (columnKey) {
        case "imp":
          return row.show ? (
            <div className="flex flex-row gap-2 justify-center">
              <Button
                color="default"
                variant="ghost"
                size="sm"
                endContent={<Pencil />}
                onPress={() => {
                  setModalContent(modalEdit);
                  onOpen();
                }}
              ></Button>
              <Button
                size="sm"
                color="primary"
                variant="shadow"
                endContent={<Clock />}
                onPress={() => {
                  alert(userName);
                  // setModalContent(modalCount);
                  // socket.emit("showModal");
                }}
              ></Button>
            </div>
          ) : (
            <></>
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
          onPress={ReproveFn}
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
        <Button color="danger" variant="ghost" onPress={onClose}>
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

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const name = data.nameUser as string;
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    console.log(name);
    setUserName(name);
    setTimeout(() => {
      console.log(userName);
    }, 0);

    const sessionData = {
      name,
      expirationTime,
    };
    console.log(sessionData.name);
    localStorage.setItem("name", JSON.stringify(sessionData));
    onClose();
    toast.success(`Bem-vindo, ${name}!`);
  };
 

  const updateName = () =>{
    const sessionData = localStorage.getItem("name");
    if (sessionData) {
      const { name, expirationTime } = JSON.parse(sessionData);
      if (new Date().getTime() < expirationTime) {
          setUserName(name);
          setModalContent(modalCount);
      } else {
        localStorage.removeItem("name");
      }
    } else {
      setModalContent(modalName);
      onOpen();
    }
  }
  updateName();

  const modalName = (
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

  const [modalContent, setModalContent] =
    useState<React.JSX.Element>(modalCount);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Toaster position="bottom-right" reverseOrder={true} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop={"blur"}
        hideCloseButton={true}
        isDismissable={false}
      >
        <ModalContent>{(onClose) => <>{modalContent}</>}</ModalContent>
      </Modal>

      <div className="flex flex-col gap-3">
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
