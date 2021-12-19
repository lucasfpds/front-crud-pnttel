import { useState } from "react";
import { useLocalStorage } from "react-use";
import hamburguer from "../assets/hamburguer.svg";
import close from "../assets/close.svg";

function useGlobalProvider() {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalMobile, setShowModalMobile] = useState(false);
  const [img, setImg] = useState(hamburguer);
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [user, setUser, removeUser] = useLocalStorage("user", {
    name: "Visitante",
  });

  return {
    token,
    setToken,
    removeToken,
    user,
    setUser,
    removeUser,
    showModalDelete,
    setShowModalDelete,
    showModalMobile,
    setShowModalMobile,
    hamburguer,
    close,
    img,
    setImg,
  };
}

export default useGlobalProvider;
