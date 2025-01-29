import { FakeData } from "@/types";

export const updateShowStatus = (prevRows: FakeData[]) => {
  const currentIndex = prevRows.findIndex(row => row.show);
  if (currentIndex !== -1) {
    const newRows = [...prevRows];
    newRows[currentIndex].show = false;
    const nextIndex = (currentIndex + 1) % prevRows.length;
    newRows[nextIndex].show = true;
    return newRows;
  }
  return prevRows;
};

export const getStoredUserName = () => {
  const sessionData = sessionStorage.getItem("name");
  if (sessionData) {
    const { name, expirationTime } = JSON.parse(sessionData);
    if (new Date().getTime() < expirationTime) {
      return name;
    }
    sessionStorage.removeItem("name");
  }
  return "";
};

export const storeUserName = (name: string) => {
  const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000;
  sessionStorage.setItem("name", JSON.stringify({ name, expirationTime }));
};