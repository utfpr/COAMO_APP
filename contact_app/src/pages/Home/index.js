import ContactBanner from "../assets/contact-banner.jpg"

export default function Principal() {
  return (
    <div className="text-center">
      <h3>Aplicação de Contatos - COAMO (GTI)</h3>
      <img className="img-fluid rounded" src={ContactBanner} alt="img1" />
    </div>
  )
}