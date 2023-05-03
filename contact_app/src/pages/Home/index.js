import { useNavigate } from "react-router-dom";
import ContactBanner from "../assets/contact-banner.jpg"
import './style.css'

export default function Principal() {
    const navigate = useNavigate();
    async function viewContacts(event) {
        navigate('/contacts');
    }

    return (
        <div className="principal-container">
            <img src={ContactBanner} alt="img1" />
            <br />
            <form onSubmit={viewContacts}>
                <button type="submit">lista de contatos</button>
            </form>
        </div>
    )
}