import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import { googleMapsApiKey } from "../../services/apiKeys";
import geocode from "../../services/geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import md5 from "md5";
import WhatsAppPopup from "./WhatsAppPopup";

export default function ContactDetail() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const getDetails = async (id) => {
        try {
          // obtém dados de contato
          const resContact = await api.get(`/contatos/${id}`);
          setDetails(resContact.data);
          // informações do gravatar
          setAvatarUrl(getGravatarUrl(resContact.data.email));
          // obtém dados do mapa
          const { logradouro, cidade, estado } = resContact.data;
          const address = `${logradouro}, ${cidade}, ${estado}`;
          const resMap = await geocode(address);
          const { latitude, longitude } = resMap;
          setCoordinates({ lat: latitude, lng: longitude });
        } catch (error) {
          console.log('Erro ao carregar os dados', error);
        }
      }
      getDetails(id);
    }
  }, [id]);

  if (!details || !details.grupo) {
    return <p>carregando...</p>
  }

  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  function getGravatarUrl(email) {
    const hash = md5(email.trim().toLowerCase());
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
    return gravatarUrl;
  }

  const abrirPopup = () => {
    setPopupVisible(true);
    console.log('Abriu Popup');
  }

  return (
    <div className="container">
      <h2>Detalhes do contato</h2>
      <ul className="list-group">
        {details.nome &&
          <li className="d-flex list-group-item">
            <img className="img-fluid me-2 rounded" src={avatarUrl} alt="Avatar" />
            <h4>{details.nome}</h4>
          </li>
        }
        {details.grupo &&
          <li className="list-group-item"><b>Grupo</b>: {details.grupo.nome}</li>
        }
        {details.telefone_list.length !== 0 &&
        <>
          <li className="list-group-item"><b>Telefones</b>:</li>
          
            <ul className="list-group">
              {details.telefone_list.map((tel) => (
                <li className="list-group-item" key={tel.id}>
                  <div className="row align-items-center">
                    <div className="col-sm-3">
                      {tel.tipo_telefone.descrição}: {tel.número}
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-success" type="button" 
                        onClick={() => {abrirPopup()}}>
                        enviar WhatsApp
                      </button>
                      {popupVisible && <WhatsAppPopup num={tel.número} closePopup={
                        () => setPopupVisible(false)} />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        </>
        }
        
        {details.empresa &&
          <li className="list-group-item"><b>Empresa</b>: {details.empresa}</li>
        }
        {details.cargo &&
          <li className="list-group-item"><b>Cargo</b>: {details.cargo}</li>
        }
        {details.email &&
          <li className="list-group-item">
            <b>E-mail</b>: <a href={`mailto:${details.email}`}>{details.email}</a>
          </li>
        }
        {details.aniversário &&
          <li className="list-group-item"><b>Aniversário</b>: {details.aniversário}</li>
        }
        {(details.logradouro || details.cidade || details.estado) &&
          <li className="list-group-item">
            <b>Endereço</b>: {details.logradouro ? `${details.logradouro}` : '(não especificado)'}
            {details.cidade ? ` - ${details.cidade}` : ''}
            {details.estado ? ` - ${details.estado}` : ''}
            <br /><br />
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={17}>
                <Marker position={coordinates} />
              </GoogleMap>
            </LoadScript>
          </li>
        }
        {details.cep &&
          <li className="list-group-item"><b>CEP</b>: {details.cep}</li>
        }
        {details.observações &&
          <li className="list-group-item"><b>Observações</b>: {details.observações}</li>
        }
      </ul>
      <br />
      <button className="btn btn-primary" type="button"
        onClick={() => {window.location.href = `/contacts/${details.id}/edit/`}}>
        Editar contato
      </button>
      <br /><br />
    </div>
  )
}