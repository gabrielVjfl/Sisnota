import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../services/Action";

import { Table, Modal, Button } from "react-bootstrap";

import Axios from "axios";
import URL from "../utils/URL";

import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import PersistentData from "../utils/PersistentData";

const ListAlunos = () => {
  const history = useHistory();

  const { state } = useContext(UserContext);

  const [list, setList] = useState([]);
  const [countList, setCountList] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [temp, setTemp] = useState("ASC");

  useEffect(() => {
    HandleCountList();
  }, []);

  useEffect(() => {
    HandleCountList();
  }, [list]);

  useEffect(() => {
    HandleList();
  }, [page, state.dados.id, temp, count]);

  const HandleList = async () => {
    try {
      let response = await Axios.get(
        `${URL}/alunos/list/${state.dados.id}?page=${page}&temp=${temp}`
      );

      console.log(response.data);

      setList([...list, ...response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleCountList = async () => {
    try {
      let response = await Axios.get(`${URL}/alunos/count`);

      console.log(response.data);

      setCount(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleNotas = (id) => {
    history.push(`/notas/${id}`);
  };

  const HandleEdit = (id) => {
    history.push(`/edit/aluno/${id}`);
  };

  const HandleDelete = async (id) => {
    try {
      await Axios.delete(`${URL}/alunos/delete/${state.dados.id}?myid=${id}`);

      console.log("Meu id", id);
      console.log("Id context", state.dados.nome);

      Swal.fire({
        title: "Sucesso!",
        text: "Deletado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro ao deletar!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <Table responsive="md" id="table" striped bordered hover>
          <thead>
            <tr>
              <th>Mátricula</th>
              <th>Nome</th>
              <th>Sexo</th>
              <th>Idade</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Série</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.numero_matricula}</td>
                <td>{item.nome}</td>
                <td>{item.sexo}</td>
                <td>{item.idade}</td>
                <td>{item.telefone}</td>
                <td>{item.endereco}</td>
                <td>{item.Series.nome}</td>
                <td>
                  <button
                    onClick={() => HandleNotas(item.id)}
                    className="btn btn-primary"
                  >
                    Notas
                  </button>{" "}
                  <button
                    onClick={() => HandleEdit(item.id)}
                    className="btn btn-warning"
                  >
                    Alterar
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => HandleDelete(item.id)}
                  >
                    Deletar
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <span style={{ fontWeight: "bold" }}>
          Você viu {list.length} de {count} Alunos
        </span>
        <br />
        <br />
        <button className="btn btn-success" onClick={() => setPage(page + 1)}>
          Ver mais alunos
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};
export default PersistentData(ListAlunos);
