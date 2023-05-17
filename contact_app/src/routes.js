import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Principal from "./pages/Home";
import ContactList from "./pages/Contacts/ContactList";
import ContactDetail from "./pages/Contacts/ContactDetail";
import ContactNew from "./pages/Contacts/ContactNew";
import GroupList from "./pages/Groups/GroupList";
import GroupDetail from "./pages/Groups/GroupDetail";
import GroupNew from "./pages/Groups/GroupNew";
import 'bootstrap/dist/css/bootstrap.css'
import Nav from "./nav";
import isAuthenticated from "./services/auth";
import Login from "./login";

function ProtectedRoutes() {
  return (
    <>
      {isAuthenticated() ? (
        <Routes>
          <Route path="contacts/" element={<ContactList />} />
          <Route path="contacts/:id/" element={<ContactDetail />} />
          <Route path="contacts/new/" element={<ContactNew />} />
          <Route path="contacts/:id/edit/" element={<ContactNew />} />

          <Route path="groups/" element={<GroupList />} />
          <Route path="groups/:id/" element={<GroupDetail />} />
          <Route path="groups/new/" element={<GroupNew />} />
          <Route path="groups/:id/edit/" element={<GroupNew />} />
        </Routes>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  )
}

export default function MyRoutes() {
  return (
    <Router>
      <div className="container">
        <div className="row-1">
          <br />
          <Nav />
          <br />
          <div className="col-12">
            <Routes>
              <Route path="/" element={<Principal />} />
              <Route path="/*" element={<ProtectedRoutes />} />
              <Route path="/login/" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
  </Router>
  )
}

function NotFound() {
  return (
    <div>
      <h2>Essa página não existe!</h2>
    </div>
  )
}