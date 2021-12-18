import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalProvider() {
  const [showModalDelete, setShowModalDelete] = useState(false);
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
  };
}

export default useGlobalProvider;
