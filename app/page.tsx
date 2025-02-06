"use client";
/* eslint-disable import/order */
import toast, { Toaster } from "react-hot-toast";
import socket from "../lib/socket/socket";
import { I18nProvider } from "@react-aria/i18n";
import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import { INITIAL_VISIBLE_COLUMNS, rows, columns } from "../lib/constants";
import {
  updateShowStatus,
  getStoredUserName,
  storeUserName,
} from "../lib/utils";
import { useSocketListeners } from "../lib/hooks/hooks";
import ModalEdit from "./_components/ModalEdit";
import ModalCount from "./_components/ModalCount";
import ModalName from "./_components/ModelName";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [admin, setAdmin] = useState(false);
  const [updatedRows, setUpdatedRows] = useState<FakeData[]>(rows);
  const [headerColumn, setheaderColumn] = useState<
    {
      uid: string;
      name: string;
    }[]
  >([]);

  const headerColumns = React.useMemo(() => {
    return;
  }, []);
  useSocketListeners(onOpen);
  const ConfirmFn = () => {
    socket.emit("approved", getStoredUserName());
    onClose();
  };

  const ReproveFn = () => {
    socket.emit("refused", getStoredUserName());
    onClose();
  };

  const renderCell = useCallback((row: FakeData, columnKey: React.Key) => {
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
                setModalContent(
                  <ModalEdit onClose={onClose} confirmFn={ConfirmFn} />
                );
                onOpen();
              }}
            ></Button>
            <Button
              size="sm"
              color="primary"
              variant="shadow"
              endContent={<Clock />}
              onPress={() => {
                setModalContent(
                  <ModalCount
                    confirmFn={ConfirmFn}
                    reproveFn={ReproveFn}
                    onClose={onClose}
                  />
                );
                socket.emit("showModal");
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
  }, []);

  const submit = (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const name = data.nameUser as string;
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

    const visibleColumns =
      name === "carolutic"
        ? INITIAL_VISIBLE_COLUMNS
        : INITIAL_VISIBLE_COLUMNS.slice(0, -1);
    setheaderColumn(
      columns.filter((column) => visibleColumns.includes(column.uid))
    );

    const sessionData = {
      name: name === "carolutic" ? "Carol" : name,
      expirationTime,
    };
    sessionStorage.setItem("name", JSON.stringify(sessionData));
    toast.success(`Bem-vindo(a), ${sessionData.name}!`);
    onClose();
    setModalContent(
      <ModalCount
        confirmFn={ConfirmFn}
        reproveFn={ReproveFn}
        onClose={onClose}
      />
    );
  };

  const [modalContent, setModalContent] = useState<React.JSX.Element>(
    <ModalCount confirmFn={ConfirmFn} reproveFn={ReproveFn} onClose={onClose} />
  );

  useEffect(() => {
    const sessionData = sessionStorage.getItem("name");

    if (sessionData) {
      const { name, expirationTime } = JSON.parse(sessionData);
      if (new Date().getTime() < expirationTime) {
        setModalContent(
          <ModalCount
            confirmFn={ConfirmFn}
            reproveFn={ReproveFn}
            onClose={onClose}
          />
        );
      } else {
        sessionStorage.removeItem("name");
      }
    } else {
      setModalContent(<ModalName onSubmit={submit} />);
      onOpen();
    }
  }, []);

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
          <TableHeader columns={headerColumn}>
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
