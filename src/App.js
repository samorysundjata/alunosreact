import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from "./assets/cadastro.jpg";

function App() {
  const baseUrl = "http://localhost:7266/api/alunos";
  return (
    <div className="App">
      <br />
      <h3>Cadastro de Alunos</h3>
      <header className="App-header">
        <image src={logoCadastro} alt="logoCadastro" />
        <button className="btn btn-success">Incluir Novo Aluno</button>
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
        <tbody>{/* exibir os dados */}</tbody>
      </table>
    </div>
  );
}

export default App;
