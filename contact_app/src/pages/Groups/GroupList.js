import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  const getGroups = async () => {
    await api.get("/grupos")
      .then((res) => setGroups(res.data));
  }

  const getContacts = async () => {
    await api.get("/contatos")
      .then((res) => setContacts(res.data));
  }

  const handleSendMails = async (idGroup) => {
    const contactsFromGroup = contacts.filter(
      (contact) => contact.grupo.id === idGroup
    )
    const emailList = contactsFromGroup.map(contact => contact.email);
    window.location.href = `mailto:?bcc=${emailList}`;
  }

  const handleDelete = async (idGroup) => {
    await api
      .delete(`grupos/${idGroup}`)
      .then((res) => console.log(res));
    getGroups();
  }

  useEffect(() => {
    getGroups();
    getContacts();
  }, []);

  if (!groups || !contacts) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <h2>Lista de grupos</h2>
      <ul className="list-group">
        {groups.map((group) => (
          <li className="list-group-item" key={group.id}>
            <div className="row">
              <div className="col-sm-6">
                <Link to={`${group.id}`}>{group.nome}</Link>
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                <button className="btn btn-success me-4" onClick={() => handleSendMails(group.id)}>
                  enviar <b>e-mail</b> para o grupo
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(group.id)}>
                  excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <button className="btn btn-primary" onClick={() => navigate('/groups/new')}>
        Novo grupo
      </button>
    </div>
  )
}