import { useNavigate } from "react-router-dom";
import ContactBanner from "../assets/contact-banner.jpg"
import './style.css'
import React from "react";

export default function Principal() {
    const navigate = useNavigate();

    async function viewContacts() {
        navigate('/contacts');
    }

    async function viewGroups() {
        navigate('/groups');
    }

    return (
        <div className="principal-container">
            <img src={ContactBanner} alt="img1" />
            <br />
            <form onSubmit={viewContacts}>
                <button type="submit">lista de contatos</button>
            </form>
            <br />
            <form onSubmit={viewGroups}>
                <button type="submit">lista de grupos</button>
            </form>
        </div>
    )
}