import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPersons, deletePerson } from "../api/personService";

export default function PersonList() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const loadPersons = async () => {
    try {
      setLoading(true);
      const data = await getAllPersons();
      setPersons(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPersons();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer cette personne ?")) return;

    try {
      await deletePerson(id);
      loadPersons();
    } catch (err) {
      alert("Erreur lors de la suppression");
      console.error(err);
    }
  };

  /* ---------- SEARCH FILTER ---------- */
  const filteredPersons = useMemo(() => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.id.toString().includes(search)
    );
  }, [persons, search]);

  /* ---------- UI STATES ---------- */

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={loadPersons}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  /* ---------- MAIN RENDER ---------- */

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="translate-x-[135%] max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            👥 Liste des utilisateurs
          </h1>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Search Field */}
            <input
              type="text"
              placeholder="🔍 Rechercher par nom ou âge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-16 py-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72"
            />

            {/* Add Button */}
            <button
              onClick={() => navigate("/users/new")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              ➕ Ajouter un utilisateur
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-8 py-4 text-left">ID</th>
                  <th className="px-8 py-4 text-left">Nom</th>
                  <th className="px-8 py-4 text-left">Âge</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPersons.map((person, index) => (
                  <tr
                    key={person.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50`}
                  >
                    <td className="px-8 py-4">{person.id}</td>
                    <td className="px-8 py-4 font-medium">{person.name}</td>
                    <td className="px-8 py-4">{person.age}</td>
                    <td className="px-8 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => navigate(`/users/edit/${person.id}`)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPersons.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              Aucun utilisateur trouvé
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
