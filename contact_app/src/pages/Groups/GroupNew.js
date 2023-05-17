import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function GroupNew() {
  const [form, setForm] = useState({
    nome: '',
    link_whats: ''
  })
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id ? `/grupos/${id}/` : `/grupos/`;
    const method = id ? 'put' : 'post';
    await api[method](url, form).then((res) => {
      console.log(res);
    })
    navigate(`/groups`);
  }

  const getDetails = async (id) => {
    const res = await api.get(`/grupos/${id}`);
    return res.data;
  }

  useEffect(() => {
    if (id) {
      getDetails(id).then((res) => {
        const { nome, link_whats } = res;
        setForm({ nome: nome || '', link_whats: link_whats || '' });
      })
    }
  }, [id]);

  return (
    <div className="App">
      <h2>{id ? 'Atualizando' : 'Criando'} o grupo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="nome" 
            name="nome" value={form.nome} onChange={handleChange} />
          <label>Nome</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="link_whats" 
            name="link_whats" value={form.link_whats} onChange={handleChange} />
          <label>Link do grupo no WhatsApp</label>
        </div>
        <button className="btn btn-primary" type="submit">{id ? 'Atualizar' : 'Salvar'}</button>
        <br /><br />
      </form>
    </div>
  )
}