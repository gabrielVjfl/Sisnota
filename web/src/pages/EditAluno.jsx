import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { Container, TitlePage, Card, CardBody, Box } from "../styles/Pages";
import { UserContext } from "../services/Action";
import { useParams, useHistory } from "react-router-dom";
import URL from "../utils/URL";
import Axios from "axios";
import Swal from "sweetalert2";
import "cleave.js/dist/addons/cleave-phone.br";
import Cleave from "cleave.js/react";
import PersistentData from "../utils/PersistentData";

const EditAluno = () => {
  const { state } = useContext(UserContext);

  const { id } = useParams();

  const [listSerie, setListSerie] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [numero_matricula, setNumeroMatricula] = useState(null);
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState(null);
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [SeriesId, setSeriesId] = useState(null);
  const [UserId, setUserId] = useState(state.dados.id);

  useEffect(() => {
    HandleSeries();
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      FindGetInfo(id);
    }
  }, [id]);

  const FindGetInfo = async (id) => {
    try {
      let response = await Axios.get(`${URL}/alunos/list/params/${id}`);

      console.log("Meu id", UserId);

      console.log("Minha resposta", response.data);

      setNome(response.data[0].nome);
      setNumeroMatricula(response.data[0].numero_matricula);
      setSexo(response.data[0].sexo);
      setIdade(response.data[0].idade);
      setTelefone(response.data[0].telefone);
      setEndereco(response.data[0].endereco);
      setSeriesId(response.data[0].SeriesId);
    } catch (err) {}
  };

  const HandleEdit = async (e) => {
    console.log("id do usuario", state.dados.id);
    try {
      e.preventDefault();
      setLoading(true);
      let response = await Axios.put(
        `${URL}/alunos/update/${state.dados.id}?myid=${id}`,
        {
          nome: nome,
          numero_matricula: numero_matricula,
          sexo: sexo,
          idade: idade,
          telefone: telefone,
          endereco: endereco,
          SeriesId: SeriesId,
          UserId: state.dados.id,
        }
      );

      setLoading(false);

      Swal.fire({
        title: "Sucesso!",
        text: "Aluno Alterado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Erro!",
        text: err.response.data.errBackend,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const HandleSeries = async () => {
    try {
      let response = await Axios.get(`${URL}/serie/list`);

      setListSerie(response.data);
    } catch (err) {}
  };

  return (
    <Container>
      <Header />
      <Box>
        <TitlePage>Alterar Aluno</TitlePage>
        <br />
        <Card className="card">
          <CardBody className="card-body">
            <form onSubmit={HandleEdit}>
              <label>Nome Completo:</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={nome}
                autoFocus={true}
                placeholder="Digite o nome completo do aluno"
                required
                onChange={(e) => setNome(e.target.value)}
              />
              <br />
              <label>Número de Matrícula:</label>
              <input
                type="number"
                className="form-control"
                name="numero_matricula"
                value={numero_matricula}
                placeholder="Digite o número de matrícula"
                required
                onChange={(e) => setNumeroMatricula(e.target.value)}
              />

              <br />

              <label>Sexo:</label>
              <select
                className="form-select"
                name="sexo"
                value={sexo}
                required
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value="">Selecione o seu sexo</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Prefiro não dizer">Prefiro não dizer</option>
              </select>
              <br />
              <label>Idade:</label>
              <input
                type="number"
                className="form-control"
                name="idade"
                value={idade}
                placeholder="Digite a idade do aluno"
                required
                onChange={(e) => setIdade(e.target.value)}
              />

              <br />

              <label>Telefone:</label>
              <br />
              <Cleave
                type="text"
                name="telefone"
                options={{
                  phone: true,
                  phoneRegionCode: "BR",
                  delimiter: "-",
                }}
                className="form-control"
                placeholder="Digite o seu telefone"
                value={telefone}
                required
                onChange={(e) => setTelefone(e.target.value)}
              />
              <br />

              <label>Endereço:</label>
              <input
                type="text"
                name="endereco"
                className="form-control"
                value={endereco}
                placeholder="Digite o endereço do aluno"
                required
                onChange={(e) => setEndereco(e.target.value)}
              />
              <br />
              <label>Série do aluno:</label>
              <select
                className="form-select"
                name="SeriesId"
                value={SeriesId}
                required
                onChange={(e) => setSeriesId(e.target.value)}
              >
                <option value="">Selecione a série do aluno</option>
                {listSerie.map((items) => (
                  <option key={items.id} value={items.id}>
                    {items.nome}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="btn btn-success">
                {loading == true ? (
                  <div>
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>Salvar Aluno</div>
                )}
              </button>
              <br />
            </form>
          </CardBody>
        </Card>
      </Box>
    </Container>
  );
};
export default PersistentData(EditAluno);
