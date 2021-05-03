import React, { useState } from "react";
import Header from "../components/Header";
import { Container, TitlePage, Card, CardBody, Box } from "../styles/Pages";
import { UserContext } from "../services/Action";
import { useParams, useHistory } from "react-router-dom";
import URL from "../utils/URL";
import Axios from "axios";
import Swal from "sweetalert2";
import PersistentData from "../utils/PersistentData";
const AddNotas = () => {
  const history = useHistory();

  const { id, nome } = useParams();

  const [valor, setValor] = useState(null);
  const [status, setStatus] = useState("");
  const [AlunoId, setAlunoId] = useState(id);
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async (e) => {
    try {
      if (valor <= 5) {
        setStatus("Reprovado");
      } else if (valor > 5) {
        setStatus("Aprovado");
      }

      e.preventDefault();

      setLoading(true);

      let response = await Axios.post(`${URL}/notas/create`, {
        valor: valor,
        status: status,
        AlunoId: AlunoId,
      });
      console.log(response);

      setLoading(false);

      setValor("");
      setStatus("");

      Swal.fire({
        title: "Sucesso!",
        text: "Nota Adicionada!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      history.push(`/notas/${AlunoId}`);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      <Box>
        <TitlePage>Adicionar Nota</TitlePage>

        <Card className="card">
          <CardBody className="card-body">
            <label>Aluno(a)</label>
            <input type="text" value={nome} className="form-control" />
            <form onSubmit={HandleSubmit}>
              <label>Valor (entre 0 e 10)</label>
              <input
                type="number"
                placeholder={`Adicione uma nota para ${nome}`}
                min="0"
                max="10"
                value={valor}
                name="valor"
                onChange={(e) => setValor(e.target.value)}
                className="form-control"
                autoFocus={true}
                required
              />
              <br />
              <button type="submit" className="btn btn-success">
                {loading == true ? (
                  <div>
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>Salvar Nota</div>
                )}
              </button>
            </form>
          </CardBody>
        </Card>
      </Box>
    </Container>
  );
};
export default PersistentData(AddNotas);
