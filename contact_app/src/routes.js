import React from "react";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Principal from "./pages/Home";
import List from "./pages/Contacts/List";
import ContactDetail from "./pages/Contacts/ContactDetails";
import NewContact from "./pages/Contacts/NewContact";

export default function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="contacts/" element={<List />} />
        <Route path="contacts/:id/" element={<ContactDetail />} />
        <Route path="contacts/new/" element={<NewContact />} />
        <Route path="contacts/:id/edit/" element={<NewContact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function NotFound() {
  return (
    <div>
      <h2>Essa página não existe!</h2>
      <p>
        <Link to={'/'}>voltar</Link>
      </p>
    </div>
  )
}