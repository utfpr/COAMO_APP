import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

export default function GroupDetail() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  
  const getDetails = async (id) => {
    await api.get(`/grupos/${id}`)
      .then((res) => setDetails(res.data));
  }

  useEffect(() => {
    if (id) getDetails(id);
  }, [id]);

  if (!details) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <h2>Detalhes do grupo</h2>
      <ul>
        <li>Nome do grupo: {details.nome}</li>
        <li>Grupo no WhatsApp: {details.link_whats}</li>
      </ul>
      <Link to={'edit'}>Editar grupo</Link>
    </div>
  )
}