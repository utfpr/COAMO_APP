import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

export default function ContactDetail() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();

  const getDetails = async (id) => {
    await api.get(`/contatos/${id}`)
      .then((res) => setDetails(res.data));
  }

  useEffect(() => {
    if (id) getDetails(id);
  }, [id]);

  if (!details || !details.grupo) {
    return <p>carregando...</p>
  }

  return (
    <div className="App">
      <h2>Detalhes do contato</h2>
      <ul>
        <li>Nome: {details.nome}</li>
        <li>Grupo: {details.grupo.nome}</li>
        <li>Telefones:</li>
          <ul>
            {details.telefone_list.map((tel) => (
              <li key={tel.id}>{tel.tipo_telefone.descrição}: {tel.número}</li>
            ))}
          </ul>
        <li>Empresa: {details.empresa}</li>
        <li>Cargo: {details.cargo}</li>
        <li>E-mail: {details.email}</li>
        <li>Data de aniversário: {details.aniversário}</li>
        <li>Endereço: {details.logradouro}</li>
        <li>Cidade: {details.cidade}</li>
        <li>Estado: {details.estado}</li>
        <li>CEP: {details.cep}</li>
        <li>Observações: {details.observações}</li>
      </ul>
      <button className="btn btn-primary" type="button"
        onClick={() => {window.location.href = `/contacts/${details.id}/edit/`}}>
        Editar contato
      </button>
      <br /><br />
    </div>
  )
}