import { useEffect, useState } from "react";
// import { getAllPersons, deletePerson } from "../api/personService";

export default function PersonList({ onEdit }) {
  const [persons, setPersons] = useState([]);

  const loadPersons = async () => {
    const data = await getAllPersons();
    setPersons(data);
  };

  useEffect(() => {
    loadPersons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cette personne ?")) {
      await deletePerson(id);
      loadPersons();
    }
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Age</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.age}</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
