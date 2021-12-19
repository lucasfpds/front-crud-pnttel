import "./style.css";
import { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import { Link, useHistory } from "react-router-dom";
import { ModalDelete } from "../ModalDelete/ModalDelete";
import ModalMobile from "../ModalMobile/ModalMobile";

export default function Header() {
  const {
    showModalDelete,
    setShowModalDelete,
    user,
    setUser,
    removeToken,
    showModalMobile,
    setShowModalMobile,
    hamburguer,
    close,
    img,
    setImg,
  } = useGlobal();
  const history = useHistory();

  console.log(user);
  function handleLogout() {
    removeToken();
    setUser({ name: "Visitante" });
    history.push("/sign-in");
  }
  console.log(history);
  console.log(user);
  const { pathname } = history.location;
  return (
    <div className="header">
      <h1>Olá {user.name}</h1>
      {pathname === "/home" || pathname === "/edit" ? (
        <div className="div-buttons">
          <button onClick={handleLogout}>Logout</button>
          {pathname === "/edit" ? (
            <>
              <Link to="/home">Home</Link>
              <button onClick={() => setShowModalDelete(true)}>
                Excluir Usuário
              </button>
            </>
          ) : (
            <Link to="/edit">Editar Usuário</Link>
          )}
        </div>
      ) : null}
      {showModalDelete ? <ModalDelete /> : null}
      <ModalMobile
        pathname={pathname}
        handleLogout={handleLogout}
        setShowModalDelete={setShowModalDelete}
        showModalMobile={showModalMobile}
        setShowModalMobile={setShowModalMobile}
        hamburguer={hamburguer}
        close={close}
        img={img}
        setImg={setImg}
      />
    </div>
  );
}
