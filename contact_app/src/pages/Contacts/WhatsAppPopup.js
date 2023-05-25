import React, { useState } from "react";
import api from "../../services/api";

export default function WhatsAppPopup({ num, closePopup }) {
  const [msg, setMsg] = useState('');
  const sendMessage = async () => {
    try {
      const response = await api.post('/send-whatsapp/', {
        phone: num,
        message: msg,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="popup">
      <div className="form-floating my-2">
        <textarea className="form-control" placeholder="" value={msg}
          onChange={e => setMsg(e.target.value)} />
        <label>Digite sua mensagem</label>
      </div>
      <button className="btn btn-primary me-2" onClick={sendMessage}>
        enviar
      </button>
      <button className="btn btn-danger" onClick={closePopup}>
        fechar
      </button>
    </div>
  )
}