import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function NewContact() {
  const [formData, setFormData] = useState({
    nome: '',
    grupo: {
      nome: '',
      link_whats: ''
    },
    empresa: '',
    cargo: '',
    email: '',
    aniversario: '',
    logradouro: '',
    cidade: '',
    estado: '',
    cep: '',
    observacoes: '',
  })
  
  const { id } = useParams();

  const handleChange = e => {
    const { key, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleGroupChange = e => {
    const { key, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      grupo: {
        ...prevState.grupo,
        [key]: value
      }
    }))
  }

  const handleSubmit = async e => {
    e.prevState();
    const url = formData.id ? `/contatos/${id}` : `/contatos`;
    const method = formData.id ? 'put' : 'post';
    await api[method](url, formData).then((res) => {
      console.log(res);
    })
  }

  const getDetails = async (id) => {
    const res = await api.get(`/contatos/${id}`);
    return res.data;
  }

  useEffect(() => {
    if (id) {
      getDetails(id).then((contato) => {
        setFormData({ ...contato })
      })
    }
  }, [id])

  return (
    <div className="App">
      <h2>{id ? 'Atualizando' : 'Criando'} o contato</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome: <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} /></label>
        <h3>Informações do grupo</h3>
        <label>
        Grupo: <input type="text" name="nome" value={formData.grupo.nome} onChange={handleGroupChange} />
        </label>
        <label>
        Link (WhatsApp): <input type="text" name="link_whats" value={formData.grupo.link_whats? formData.grupo.link_whats : ""} onChange={handleGroupChange} />
        </label>
        <br />
        <label>
        Empresa: <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} />
        </label>
        <label>
        Cargo: <input type="text" id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} />
        </label>
        <label>
        Email: <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
        Aniversário: <input type="date" id="aniversario" name="aniversario" value={formData.aniversario} onChange={handleChange} />
        </label>
        <label>
        Logradouro: <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
        </label>
        <label>
        Cidade: <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
        </label>
        <label>
        Estado: <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
        </label>
        <label>
        CEP: <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} />
        </label>
        <label>
        Observações: <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange}></textarea>
        </label>
        <button type="submit">{id ? 'Atualizar' : 'Salvar'}</button>
      </form>
    </div>
  )
}