import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Select from "react-select";

export default function ContactNew() {
  const [form, setForm] = useState({
    nome: '',
    grupo: {
      id: '',
      nome: '',
      link_whats: ''
    },
    telefone_list: [],
    empresa: '',
    cargo: '',
    email: '',
    aniversário: '',
    logradouro: '',
    cidade: '',
    estado: '',
    cep: '',
    observações: '',
  })
  const [optionsGroup, setOptionsGroup] = useState([]);
  const [textInputGroup, setTextInputGroup] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSelectChange(option) {
    setTextInputGroup(option.label)
    form.grupo.nome = option.label
    form.grupo.id = option.value
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleGroupChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, grupo: {
        ...form.grupo, [name]: value
      }
    })
  }

  function handleTelDescChange(index, e) {
    const newPhones = [...form.telefone_list];
    newPhones[index].tipo_telefone.descrição = e.target.value;
    setForm({ ...form, telefone_list: newPhones });
  }

  function handleTelNumberChange(index, e) {
    const newPhones = [...form.telefone_list];
    newPhones[index].número = e.target.value;
    setForm({ ...form, telefone_list: newPhones });
  }

  function handleAddTel() {
    const newPhones = [...form.telefone_list];
    newPhones.push({
      tipo_telefone: {
        descrição: ''
      },
      número: ''
    });
    setForm({ ...form, telefone_list: newPhones });
  }

  function handleRemTel(index) {
    const newPhones = [...form.telefone_list];
    newPhones.splice(index, 1);
    setForm({ ...form, telefone_list: newPhones });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!optionsGroup.some(v => v.label === form.grupo.nome))
      form.grupo.id = null;
    const url = id ? `/contatos/${id}/` : `/contatos/`;
    const method = id ? 'put' : 'post';
    await api[method](url, form).then((res) => {
      console.log(res);
    })
    navigate('/contacts');
  }

  const getDetails = async (id) => {
    const res = await api.get(`/contatos/${id}`);
    return res.data;
  }

  useEffect(() => {
    const fetchOptionsGroups = async () => {
      try {
        const res = await api.get('/grupos');
        const formattedOptions = res.data.map((value) => ({
          value: value.id,
          label: value.nome,
        }))
        setOptionsGroup(formattedOptions)
      } catch (error) {
        console.log('Erro ao buscar os itens de grupo: ', error);
      }
    }
    fetchOptionsGroups();

    if (id) {
      getDetails(id).then((res) => {
        const {nome, grupo, telefone_list, empresa, cargo, email,
          aniversário, logradouro, cidade, estado, cep, observações } = res;
        setForm({
          nome: nome || '',
          grupo: grupo || {},
          telefone_list: telefone_list || [],
          empresa: empresa || '',
          cargo: cargo || '',
          email: email || '',
          aniversário: aniversário || '',
          logradouro: logradouro || '',
          cidade: cidade || '',
          estado: estado || '',
          cep: cep || '',
          observações: observações || '',
        })
      })
    }
  }, [id])

  return (
    <div className="App">
      <h2>{id ? 'Atualizando' : 'Criando'} o contato</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="nome" 
            name="nome" value={form.nome} onChange={handleChange} />
          <label>Nome</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="empresa" name="empresa" 
            value={form.empresa} onChange={handleChange} />
          <label>Empresa</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="cargo" name="cargo" value={form.cargo} 
                    onChange={handleChange} />
          <label>Cargo</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="email" id="email" name="email" value={form.email} 
                    onChange={handleChange} />
          <label>Email</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="date" id="aniversario" 
                              name="aniversário" value={form.aniversário} onChange={handleChange} />
          <label>Data de nascimento</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="logradouro" name="logradouro" 
            value={form.logradouro} onChange={handleChange} />
          <label>Logradouro</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="cidade" name="cidade" value={form.cidade} 
            onChange={handleChange} />
          <label>Cidade</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="estado" name="estado" value={form.estado} 
            onChange={handleChange} />
          <label>Estado</label>
        </div>
        <div className="form-floating mb-2">
          <input className="form-control" placeholder="" type="text" id="cep" name="cep" value={form.cep} 
            onChange={handleChange} />
          <label>CEP</label>
        </div>
        <div className="form-floating mb-4">
          <textarea className="form-control" placeholder="" id="observacoes" name="observações" 
            value={form.observações} onChange={handleChange}></textarea>
          <label>Observações</label>
        </div>

        <h3>Informações do grupo</h3>
        
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating mb-2">
              <input className="form-control" placeholder="" type="text" name="nome" value={form.grupo.nome} 
                onChange={handleGroupChange} />
              <label>Grupo</label>
            </div>
          </div>
          <div className="col-md">
            <Select
              placeholder="Selecione um existente..."
              options={optionsGroup} onChange={handleSelectChange} />
          </div>
        </div>

            
        <div className="form-floating mb-4">
          <input className="form-control" placeholder="" type="text" name="link_whats" 
            value={form.grupo.link_whats? form.grupo.link_whats : ""} 
            onChange={handleGroupChange} />
          <label>Link (WhatsApp)</label>
        </div>

        <h3>Informações de telefones</h3>

        <div className="form-floating mb-2">
          
          <label></label>
        </div>

        {form.telefone_list.map((tel, index) => (
          <div className="row g-3" key={index}>
            <div className="col-md">
              <div className="form-floating mb-2">
                <input className="form-control" placeholder="" type="text" name="descrição" 
                  value={tel.tipo_telefone.descrição}
                  onChange={(event) => handleTelDescChange(index, event)}/>
                <label>Tipo</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-2">
                <input className="form-control" placeholder="" type="text" name="número" value={tel.número}
                  onChange={(event) => handleTelNumberChange(index, event)}/>
                <label>Número</label>
              </div>
            </div>
            <div className="col-md">
              <button className="btn btn-danger" type="button" onClick={() => handleRemTel(index)}>
                  apaga
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-dark mb-4" type="button" onClick={() => handleAddTel()}>
          (+) Adicionar telefone
        </button>
        <br />
        <button className="btn btn-primary" type="submit">{id ? 'Atualizar' : 'Salvar'}</button>
        <br /><br />
      </form>
    </div>
  )
}