import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Container, TitlePage, Card, CardBody, Box } from "../styles/Pages";
import { UserContext } from "../services/Action";
import { useParams, useHistory } from "react-router-dom";
import URL from "../utils/URL";
import Axios from "axios";
import Swal from "sweetalert2";
import PersistentData from "../utils/PersistentData";
const EditNota = () => {
  const history = useHistory();

  const { id, nome } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      FindNota(id);
    }
  }, [id]);

  const [valor, setValor] = useState(null);
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const FindNota = async (id) => {
    try {
      let response = await Axios.get(`${URL}/notas/list/${id}`);

      setValor(response.data[0].valor);
    } catch (err) {}
  };

  const HandleSubmit = async (e) => {
    try {
      if (valor <= 5) {
        setStatus("Reprovado");
      } else if (valor > 5) {
        setStatus("Aprovado");
      }
      e.preventDefault();

      setLoading(true);

      let response = await Axios.put(`${URL}/notas/update/${id}`, {
        valor: valor,
        status: status,
      });

      setLoading(false);

      Swal.fire({
        title: "Sucesso!",
        text: "Nota Alterada!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Container>
      <Header />
      <Box>
        <TitlePage>Alterar Nota</TitlePage>

        <Card className="card">
          <CardBody className="card-body">
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
export default PersistentData(EditNota);
