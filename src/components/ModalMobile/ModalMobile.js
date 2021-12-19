import { Link } from "react-router-dom";

export default function ModalMobile(props) {
  const {
    pathname,
    handleLogout,
    setShowModalDelete,
    showModalMobile,
    setShowModalMobile,
    hamburguer,
    close,
    img,
    setImg,
  } = props;

  function handleOpenModal() {
    img === hamburguer ? setImg(close) : setImg(hamburguer);
    setShowModalMobile(!showModalMobile);
  }
  function handleLogoutMobile() {
    handleLogout();
    handleOpenModal();
  }
  return (
    <>
      {pathname === "/home" || pathname === "/edit" ? (
        <img
          className="img-modal"
          onClick={handleOpenModal}
          src={img}
          alt="Abrir e fechar menu"
        />
      ) : null}
      {img === close ? (
        <div className="modal-mobile">
          {pathname === "/home" || pathname === "/edit" ? (
            <div className="div-buttons">
              <button onClick={handleLogoutMobile}>Logout</button>
              {pathname === "/edit" ? (
                <>
                  <Link to="/home" onClick={handleOpenModal}>
                    Home
                  </Link>
                  <button onClick={() => setShowModalDelete(true)}>
                    Excluir Usuário
                  </button>
                </>
              ) : (
                <Link to="/edit" onClick={handleOpenModal}>
                  Editar Usuário
                </Link>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
