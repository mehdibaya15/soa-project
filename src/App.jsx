import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import UpdatePersonPage from "./components/UpdatePersonPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<PersonList />} />
        <Route path="/users/new" element={<PersonForm />} />
        <Route path="/users/edit/:id" element={<UpdatePersonPage />} />
      </Routes>
    </BrowserRouter>
  );
}
