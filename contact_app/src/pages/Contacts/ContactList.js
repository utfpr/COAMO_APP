import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ContactList() {
  const [contacts, setContact] = useState([]);
  const navigate = useNavigate();
  
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
      <ul className="list-group">
        {contacts.map((contact) => (
          <li className="list-group-item" key={contact.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link to={`${contact.id}`}>{contact.nome} ({contact.grupo.nome})</Link>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>
                excluir
              </button>
            </div>  
          </li>
        ))}
      </ul>
      <br />
      <button className="btn btn-primary" onClick={() => navigate('/contacts/new')}>
        Novo contato
      </button>
    </div>
  )
}