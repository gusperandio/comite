"use client";
import { title } from "@/components/primitives";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Divider,
  CardFooter,
  Link,
} from "@heroui/react";
import {
  BadgeCheck,
  BadgeMinus,
  BadgeX,
  CircleUserRound,
  ListCheck,
} from "lucide-react";
import { Snippet } from "@heroui/react";
import { useMemo, useState } from "react";
import type { Selection } from "@heroui/react";

export default function DocsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placement, setPlacement] = useState("bottom");
  const handleOpen = (placement: any) => {
    setPlacement(placement);
    onOpen();
  };
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const iconUser = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="#17C964">
        <path d="M12 7.5a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5" />
        <path d="M13.435 2.075a3.33 3.33 0 0 0-2.87 0c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03q.122.042.253.074l.001-.645C6.434 15.883 9.272 14.11 12 14.11s5.566 1.773 5.749 5.352v.645q.132-.032.254-.075a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928M8.75 9.25a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0" />
        <path d="m16.256 20.285l-.005-.747C16.117 16.93 14.114 15.61 12 15.61s-4.117 1.32-4.251 3.928c-.001.02-.003.276-.005.747c.58.061 1.019.25 1.482.646l.078.066c.506.431.867.74 1.261.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.455-.388.891-.583 1.482-.646" />
      </g>
    </svg>
  );
  const iconUser2 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="#006FEE">
        <path d="M12 7.5a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5" />
        <path d="M13.435 2.075a3.33 3.33 0 0 0-2.87 0c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03q.122.042.253.074l.001-.645C6.434 15.883 9.272 14.11 12 14.11s5.566 1.773 5.749 5.352v.645q.132-.032.254-.075a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928M8.75 9.25a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0" />
        <path d="m16.256 20.285l-.005-.747C16.117 16.93 14.114 15.61 12 15.61s-4.117 1.32-4.251 3.928c-.001.02-.003.276-.005.747c.58.061 1.019.25 1.482.646l.078.066c.506.431.867.74 1.261.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.455-.388.891-.583 1.482-.646" />
      </g>
    </svg>
  );
  const iconUser3 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g fill="#222">
        <path d="M12 7.5a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5" />
        <path d="M13.435 2.075a3.33 3.33 0 0 0-2.87 0c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03q.122.042.253.074l.001-.645C6.434 15.883 9.272 14.11 12 14.11s5.566 1.773 5.749 5.352v.645q.132-.032.254-.075a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928M8.75 9.25a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0" />
        <path d="m16.256 20.285l-.005-.747C16.117 16.93 14.114 15.61 12 15.61s-4.117 1.32-4.251 3.928c-.001.02-.003.276-.005.747c.58.061 1.019.25 1.482.646l.078.066c.506.431.867.74 1.261.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.455-.388.891-.583 1.482-.646" />
      </g>
    </svg>
  );

  const votes = ["approve", "reject", "pending"];

  const cardsStatus = Array(32).fill(false);
  cardsStatus[0] = true;

  const card = (status: boolean) => (
    <Card className="py-4 w-[240px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-row-reverse w-full justify-between items-start">
        <Chip color={status ? "success" : "danger"} className="text-white">
          <p>{status ? "Aberto" : "Fechado"}</p>
        </Chip>
        <div className="flex-col items-start">
          <p className="text-tiny uppercase font-bold">Carol</p>
          <small className="text-default-500">12 Demandas</small>
          <h4 className="font-bold text-large">15/06/2025</h4>
          <div className="flex flex-row items-center gap-14">
            <div className="relative">
              <div className="absolute bottom-[-1rem] left-0">{iconUser3}</div>
              <div className="absolute bottom-[-1rem] left-[1rem]">
                {iconUser2}
              </div>
              <div className="absolute bottom-[-1rem] left-[1.9rem]">
                {iconUser}
              </div>
            </div>
            <p className="text-tiny uppercase font-bold pt-2">25</p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible pt-6">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" onPress={() => handleOpen(placement)}>
              Ver Controle
            </DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["2025"])
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  return (
    <>
      <div className="flex items-start w-full ml-12">
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize" variant="bordered">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection example"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="2022">2022</DropdownItem>
            <DropdownItem key="2023">2023</DropdownItem>
            <DropdownItem key="2024">2024</DropdownItem>
            <DropdownItem key="2025">2025</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex flex-row gap-6 flex-wrap justify-center">
        {cardsStatus.map((status, index) => (
          <div key={index}>{card(status)}</div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          key={"bottom"}
          className="capitalize"
          onPress={() => handleOpen(placement)}
        >
          Open {placement}
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement={"bottom"}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                12/06/2025
              </DrawerHeader>
              <DrawerBody>
                <Accordion variant="shadow">
                  <AccordionItem
                    key="1"
                    aria-label="Demanda 1"
                    title="Demanda 1"
                  >
                    {defaultContent}
                    <div className="flex flex-row gap-6 justify-center pb-12">
                      {votes.map((vote, index) => (
                        <Card className="max-w-[400px]" key={index} shadow="sm">
                          <CardHeader className="flex gap-3">
                            {vote === "approve" && (
                              <div className="bg-green-200 p-1 rounded-lg">
                                {" "}
                                <BadgeCheck color="green" />{" "}
                              </div>
                            )}
                            {vote === "pending" && (
                              <div className="bg-yellow-100 p-1 rounded-lg">
                                <BadgeMinus color="#F5A524" />
                              </div>
                            )}
                            {vote === "reject" && (
                              <div className="bg-red-200 p-1 rounded-lg">
                                <BadgeX color="red" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <p className="text-md">HeroUI</p>
                              <p className="text-small text-default-500">
                                heroui.com
                              </p>
                            </div>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                            <p>
                              Make beautiful websites regardless of your design
                              experience.
                            </p>
                          </CardBody>
                          <Divider />
                          <CardFooter>
                            <Link
                              isExternal
                              showAnchorIcon
                              href="https://github.com/heroui-inc/heroui"
                            >
                              Copiar nomes
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Demanda 2"
                    title="Demanda 2"
                  >
                    {defaultContent}
                    <div className="flex flex-row gap-6 justify-center pb-12">
                      {votes.map((vote, index) => (
                        <Card className="max-w-[400px]" key={index} shadow="sm">
                          <CardHeader className="flex gap-3">
                            {vote === "approve" && <BadgeCheck color="green" />}
                            {vote === "pending" && (
                              <BadgeMinus color="yellow" />
                            )}
                            {vote === "reject" && <BadgeX color="red" />}
                            <div className="flex flex-col">
                              <p className="text-md">HeroUI</p>
                              <p className="text-small text-default-500">
                                heroui.com
                              </p>
                            </div>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                            <p>
                              Make beautiful websites regardless of your design
                              experience.
                            </p>
                          </CardBody>
                          <Divider />
                          <CardFooter>
                            <Link
                              isExternal
                              showAnchorIcon
                              href="https://github.com/heroui-inc/heroui"
                            >
                              Copiar nomes
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Demanda 3"
                    title="Demanda 3"
                  >
                    {defaultContent}
                    <div className="flex flex-row gap-6 justify-center pb-12">
                      {votes.map((vote, index) => (
                        <Card className="max-w-[400px]" key={index} shadow="sm">
                          <CardHeader className="flex gap-3">
                            {vote === "approve" && <BadgeCheck color="green" />}
                            {vote === "pending" && (
                              <BadgeMinus color="yellow" />
                            )}
                            {vote === "reject" && <BadgeX color="red" />}
                            <div className="flex flex-col">
                              <p className="text-md">HeroUI</p>
                              <p className="text-small text-default-500">
                                heroui.com
                              </p>
                            </div>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                            <p>
                              Make beautiful websites regardless of your design
                              experience.
                            </p>
                          </CardBody>
                          <Divider />
                          <CardFooter>
                            <Link
                              isExternal
                              showAnchorIcon
                              href="https://github.com/heroui-inc/heroui"
                            >
                              Copiar nomes
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
