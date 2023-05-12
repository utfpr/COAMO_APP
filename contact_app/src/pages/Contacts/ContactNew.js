import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import React from "react";

export default function ContactNew() {
  const [form, setForm] = useState({
    nome: '',
    grupo: {
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
  
  const { id } = useParams();
  const navigate = useNavigate();

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
        <label>
        Nome: <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} />
        </label>
        <label>
        Empresa: <input type="text" id="empresa" name="empresa" value={form.empresa} onChange={handleChange} />
        </label>
        <label>
        Cargo: <input type="text" id="cargo" name="cargo" value={form.cargo} onChange={handleChange} />
        </label>
        <label>
        Email: <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
        Data de nascimento: <input type="date" id="aniversario" name="aniversário" value={form.aniversário} onChange={handleChange} />
        </label>
        <label>
        Logradouro: <input type="text" id="logradouro" name="logradouro" value={form.logradouro} onChange={handleChange} />
        </label>
        <label>
        Cidade: <input type="text" id="cidade" name="cidade" value={form.cidade} onChange={handleChange} />
        </label>
        <label>
        Estado: <input type="text" id="estado" name="estado" value={form.estado} onChange={handleChange} />
        </label>
        <label>
        CEP: <input type="text" id="cep" name="cep" value={form.cep} onChange={handleChange} />
        </label>
        <label>
        Observações: <textarea id="observacoes" name="observações" value={form.observações} onChange={handleChange}></textarea>
        </label>
        <h3>Informações do grupo</h3>
        <label>
        Grupo: <input type="text" name="nome" value={form.grupo.nome} onChange={handleGroupChange} />
        </label>
        <label>
        Link (WhatsApp): <input type="text" name="link_whats" value={form.grupo.link_whats? form.grupo.link_whats : ""} onChange={handleGroupChange} />
        </label>
        <br />
        <h3>Informações de telefones</h3>
        <label>
          {form.telefone_list.map((tel, index) => (
            <div key={index}>
              Tipo: <input type="text" name="descrição" value={tel.tipo_telefone.descrição}
                onChange={(event) => handleTelDescChange(index, event)}/>
              &nbsp;Número: <input type="text" name="número" value={tel.número}
                onChange={(event) => handleTelNumberChange(index, event)}/>
              &nbsp;<button type="button" onClick={() => handleRemTel(index)}>apaga</button>
            </div>
          ))}
          <br />
          <button type="button" onClick={() => handleAddTel()}>
            (+) Adicionar telefone
          </button>
        </label>
        <br />
        <button type="submit">{id ? 'Atualizar' : 'Salvar'}</button>
      </form>
    </div>
  )
}