import React, { useState, useContext, useEffect } from "react";

import { Container, Title, Phrase, Card, CardBody } from "../styles/SignIn";
import { UserContext } from "../services/Action";
import Axios from "axios";
import URL from "../utils/URL";

import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
  const history = useHistory();

  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  window.onload = function () {
    let token = sessionStorage.getItem("token");
    if (token) {
      history.push("/home");
    }
  };

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      let response = await Axios.post(`${URL}/user/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("data", JSON.stringify(response.data.user));

        let tokenParse = sessionStorage.getItem("token");
        let dataParse = sessionStorage.getItem("data");

        let mytoken = JSON.parse(tokenParse);
        let mydados = JSON.parse(dataParse);

        Axios.defaults.headers.Authorization = `Bearer ${mytoken}`;

        dispatch({
          type: "SETdados",
          payload: {
            dados: mydados,
          },
        });
        dispatch({
          type: "SETtoken",
          payload: {
            dados: mytoken,
          },
        });
        dispatch({
          type: "SETauth",
          payload: {
            auth: sessionStorage.getItem("token"),
          },
        });

        history.push("/home");
      }
      setLoading(false);
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

  return (
    <Container>
      <Title>Sisnota</Title>
      <Phrase>Sistema de notas de aluno</Phrase>
      <br />
      <Card className="card">
        <CardBody className="card-body">
          <form onSubmit={HandleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite o seu email"
              name="email"
              autoFocus={true}
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Senha:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
              placeholder="Digite a sua senha"
            />
            <br />
            <button type="submit" className="btn btn-primary">
              {loading == true ? (
                <div>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div>Entrar</div>
              )}
            </button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};
export default SignIn;
