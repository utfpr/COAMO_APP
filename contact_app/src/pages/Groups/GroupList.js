import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import React from "react";

export default function GroupList() {
  const [groups, setGroups] = useState([]);

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
      <h2>Listagem de grupos</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <Link to={`${group.id}`}>{group.nome}</Link> - &nbsp;
            <button onClick={() => handleDelete(group.id)}>
              <b>Excluir</b>
            </button>
          </li>
        ))}
      </ul>
      <Link to={'new'}>Novo grupo</Link>
    </div>
  )
}