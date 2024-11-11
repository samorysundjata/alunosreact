import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from "./assets/cadastro.png";

function App() {
  const baseUrl = "https://localhost:7266/api/Alunos";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: "",
    nome: "",
    email: "",
    idade: "",
  });

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    opcao === "Editar" && abrirFecharModalEditar();
  };

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
    console.log(alunoSelecionado);
  };

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    delete alunoSelecionado.id;
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .post(baseUrl, alunoSelecionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPut = async () => {
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .put(baseUrl + "/" + alunoSelecionado.id, alunoSelecionado)
      .then((response) => {
        var resposta = response.data;
        var dadosAuxiliar = data;
        dadosAuxiliar.map((aluno) => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.nome = resposta.nome;
            aluno.email = resposta.email;
            aluno.idade = resposta.idade;
          }
        });
        abrirFecharModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    pedidoGet();
  });

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <button
          className="btn btn-success"
          onClick={() => abrirFecharModalIncluir()}
        >
          Incluir Novo Aluno
        </button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => selecionarAluno(aluno, "Editar")}
                >
                  Editar
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => selecionarAluno(aluno, "Excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Inclur Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
            />
            <br />
            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label>Idade: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>
            Incluir
          </button>
          {""}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id: </label>
            <br />
            <input
              text="text"
              className="form-control"
              readOnly
              value={alunoSelecionado && alunoSelecionado.id}
            />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.nome}
            />
            <br />
            <label>Email: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.email}
            />
            <br />
            <label>Idade: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.idade}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>
            Editar
          </button>
          {""}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
