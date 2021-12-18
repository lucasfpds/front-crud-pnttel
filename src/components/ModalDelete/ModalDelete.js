import "./style.css";
import { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import { Link, useHistory } from "react-router-dom";
import useRequests from "../../hooks/useRequests";
import toast from "../../helpers/toast";

export function ModalDelete() {
  const requests = useRequests();
  const { setShowModalDelete, setUser, removeToken, showModalDelete } = useGlobal();
  const history = useHistory();

  async function handleDeleteUser() {
    const result = await requests.del("profile");
    if (result){
        history.push("/sign-in");
        setUser({ name: "Visitante" });
        removeToken();
        setShowModalDelete(false);
        toast.messageSuccess("Usuário excluído com sucesso!");
    } else {
        toast.messageError("Erro ao excluir usuário!");
    }
  }
  return (
    <div className="div-modal-delete">
      <div className="modal-delete">
        <h2>Tem certeza que deseja excluir o usuário?</h2>
        <button onClick={() => setShowModalDelete(false)}>Cancelar</button>
        <button className="btn-delete" onClick={handleDeleteUser}>
          Excluir
        </button>
      </div>
    </div>
  );
}
