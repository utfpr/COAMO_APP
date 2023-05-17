import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const getGroups = async () => {
    await api.get("/grupos")
      .then((res) => setGroups(res.data));
  }

  const handleDelete = async (idGroup) => {
    await api
      .delete(`grupos/${idGroup}`)
      .then((res) => console.log(res));
    getGroups();
  }

  useEffect(() => {
    getGroups();
  }, []);

  if (!groups) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <h2>Lista de grupos</h2>
      <ul className="list-group">
        {groups.map((group) => (
          <li className="list-group-item" key={group.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link to={`${group.id}`}>{group.nome}</Link>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(group.id)}>
                excluir
              </button>
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