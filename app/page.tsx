"use client";
/* eslint-disable import/order */
import socket from "../lib/socket/socket";
import React, { useEffect, useState } from "react";
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
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { Clock, X } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [reproved, setReproved] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    // Cleanup the listener when the component unmounts
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
    version: string;
    status: string;
    author: string;
    reviewer: string;
    description: string;
    approver1: string;
    approver2: string;
    tester1: string;
    tester2: string;
    notes: string;
  }

  const TimerFn = () => {
    const [time, setTime] = useState(5);

    useEffect(() => {
      if (time > 0) {
        const timerId = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
      }else if (time === 0) {
        onClose();
        setReproved(true);
        setInterval(() => {
          setReproved(false);
        }, 7000);
        return;
      }
    }, [time]);

    return <div>Tempo: 00:{String(time).padStart(2, '0')}</div>;
  };

  const ConfirmFn = () => { 
    onClose();
  }

  const ReproveFn = () => { 
    onClose();
  }

  const rows: FakeData[] = [
    {
      key: "1",
      version: "db-manutencao-0.0.18",
      status: "normal - SVN",
      author: "Barnabe Silva",
      reviewer: "tempN2",
      description:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      approver1: "Marcela Sabino",
      approver2: "Marcela Sabino",
      tester1: "Matheus Enel",
      tester2: "Matheus Enel",
      notes: " - ",
    },
    {
      key: "2",
      version: "db-manutencao-0.0.18",
      status: "normal - SVN",
      author: "Barnabe Silva",
      reviewer: "tempN2",
      description:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      approver1: "Marcela Sabino",
      approver2: "Marcela Sabino",
      tester1: "Matheus Enel",
      tester2: "Matheus Enel",
      notes: " - ",
    },
    {
      key: "3",
      version: "db-manutencao-0.0.18",
      status: "normal - SVN",
      author: "Barnabe Silva",
      reviewer: "tempN2",
      description:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      approver1: "Marcela Sabino",
      approver2: "Marcela Sabino",
      tester1: "Matheus Enel",
      tester2: "Matheus Enel",
      notes: " - ",
    },
    {
      key: "4",
      version: "db-manutencao-0.0.18",
      status: "normal - SVN",
      author: "Barnabe Silva",
      reviewer: "tempN2",
      description:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      approver1: "Marcela Sabino",
      approver2: "Marcela Sabino",
      tester1: "Matheus Enel",
      tester2: "Matheus Enel",
      notes: " - ",
    },
    {
      key: "5",
      version: "db-manutencao-0.0.18",
      status: "normal - SVN",
      author: "Barnabe Silva",
      reviewer: "tempN2",
      description:
        "REQ-22 - alterando um card onde estava com erro e implementado toda caracterestica do card",
      approver1: "Marcela Sabino",
      approver2: "Marcela Sabino",
      tester1: "Matheus Enel",
      tester2: "Matheus Enel",
      notes: " - ",
    },
  ];

  const columns = [
    { key: "Projeto", label: "Projeto" },
    { key: "Tipo", label: "Tipo" },
    { key: "Quem Aplica", label: "Quem Aplica" },
    { key: "Fornecedor", label: "Fornecedor" },
    { key: "Demanda", label: "Demanda" },
    { key: "Analista", label: "Analista" },
    { key: "aprovador HML", label: "Aprovador HML" },
    { key: "desenvolvedor", label: "desenvolvedor" },
    { key: "testes", label: "Testes" },
    { key: "data", label: "Data Implantação" },
    { key: "btn", label: "Implantação" },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                db-manutencao-0.0.18 <TimerFn />
              </ModalHeader>
              <ModalBody>
                <p>
                  REQ-22 - alterando um card onde estava com erro e implementado
                  toda caracterestica do card
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
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-3">
        {reproved ? <><h1 className="text-red-500">Marcio reprovou</h1></> : <></>}
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>
                {column.label.toUpperCase()}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody>
            {rows.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.version}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{data.author}</TableCell>
                <TableCell>{data.reviewer}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.approver1}</TableCell>
                <TableCell>{data.approver2}</TableCell>
                <TableCell>{data.tester1}</TableCell>
                <TableCell>{data.tester2}</TableCell>
                <TableCell className="text-center">{data.notes}</TableCell>
                <TableCell className="text-center">
                  <Button
                    color="primary"
                    variant="shadow"
                    endContent={<Clock />}
                    onPress={() => {
                      onOpen();
                      socket.emit("showModal");
                    }}
                  >
                    TEMPORIZAR
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
