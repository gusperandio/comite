"use client";
/* eslint-disable import/order */
import socket from "../lib/socket/socket";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
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

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button
        onPress={() => {
          onOpen();
          socket.emit("showModal");
        }}
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
      <div className="flex flex-col gap-3">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
