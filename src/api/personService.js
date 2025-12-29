const BASE_URL = "http://localhost:8080/PersonREST/api/persons";

export const getAllPersons = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addPerson = async (person) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
};

export const updatePerson = async (id, person) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
};

export const deletePerson = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const getPersonById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};
