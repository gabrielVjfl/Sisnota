import React, { useEffect, useState, useContext } from "react";

import { Table, Modal, Button } from "react-bootstrap";

import Axios from "axios";
import URL from "../utils/URL";

import PersistentData from "../utils/PersistentData";

import { useParams, useHistory } from "react-router-dom";

const ListAlunosNotas = () => {
  const { id } = useParams();

  const history = useHistory();

  const [list, setList] = useState([]);
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    HandleListNotas(id);
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      HandleListNotas(id);
    }
  }, [id]);

  const HandleListNotas = async (id) => {
    try {
      let response = await Axios.get(`${URL}/alunos/notas/${id}`);

      let res = response.data.map((item) => item);

      let resNota = res[0].Notas.map((item) => item);

      console.log("Minha resposta", resNota);

      setList(response.data);
      setNotas(resNota);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleEdit = (id) => {
    history.push(`/edit/nota/${id}`);
  };

  return (
    <div className="card">
      <div className="card-body">
        {list.map((item) => (
          <div>
            <a href={`/add/notas/${item.id}/${item.nome}`}>
              <button className="btn btn-primary">
                Adicionar Nota para {item.nome}
              </button>
            </a>
          </div>
        ))}

        <br />
        <br />
        <Table responsive="md" id="table" striped bordered hover>
          <thead>
            <tr>
              <th>Mátricula</th>
              <th>Série</th>
              <th>Nota</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((item) =>
              list.map((list) => (
                <tr key={item.id}>
                  <td>{list.numero_matricula}</td>
                  <td>{list.Series.nome}</td>
                  <td>{item.valor}</td>
                  <td>{item.status}</td>

                  <td>
                    <button
                      onClick={() => HandleEdit(item.id)}
                      className="btn btn-warning"
                    >
                      Alterar
                    </button>{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default PersistentData(ListAlunosNotas);
