import React, { useContext } from "react";

import { UserContext } from "../services/Action";
import PersistentData from "../utils/PersistentData";
import { useHistory } from "react-router-dom";
import Axios from "axios";
const Header = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const SignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("data");

    Axios.defaults.headers.Authorization = undefined;

    dispatch({
      type: "SETdados",
      payload: {
        dados: "",
      },
    });

    dispatch({
      type: "SETtoken",
      payload: {
        token: "",
      },
    });

    dispatch({
      type: "SETauth",
      payload: {
        auth: "",
      },
    });
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          Sisnota
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Alunos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add/alunos">
                Adicionar Aluno
              </a>
            </li>
            <div
              style={{ position: "absolute", right: 0, marginRight: "20px" }}
            >
              <span style={{ color: "white", marginRight: "10px" }}>
                Olá {state.dados.nome}
              </span>
              <button className="btn btn-danger" onClick={() => SignOut()}>
                Deslogar
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default PersistentData(Header);
