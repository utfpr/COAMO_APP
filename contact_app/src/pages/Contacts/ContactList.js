import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function ContactList() {
  const [contacts, setContact] = useState([]);
  
  const getContacts = async () => {
    await api.get("/contatos")
      .then((res) => setContact(res.data));
  }

  useEffect(() => {
    getContacts();
  }, []);

  const handleDelete = async (idContact) => {
    await api
      .delete(`/contatos/${idContact}`)
      .then((res) => console.log(res));
    getContacts();
  }

  if (!contacts) {
    return <p>carregando...</p>
  }

  return (
    <div className="App">
      <h2>Lista de contatos</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`${contact.id}`}>{contact.nome} ({contact.grupo.nome})</Link>
            &nbsp;-&nbsp;
            <button onClick={() => handleDelete(contact.id)}>
              <b>excluir</b>
            </button>
          </li>
        ))}
      </ul>
      <Link to={'new'}>Adicionar novo contato</Link>
    </div>
  )
}