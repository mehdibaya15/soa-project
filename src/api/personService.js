const BASE_URL = "http://localhost:8085/TestRS/api/users";

/* GET all users */
export const getAllPersons = async () => {
  const response = await fetch(`${BASE_URL}/affiche`);
  return response.json();
};

/* ADD user (age + name in URL, NOT JSON) */
export const addPerson = async ({age, name}) => {
  console.log(age, "frsfr", name);
  
  const response = await fetch(`${BASE_URL}/add/${age}/${name}`, {
    method: "POST",
  });
  return response.json();
};

/* UPDATE user */
export const updatePerson = async ({id, age, name}) => {
  const response = await fetch(
    `${BASE_URL}/update/${id}/${age}/${name}`,
    { method: "PUT" }
  );
  return response.json();
};

/* DELETE user */
export const deletePerson = async (id) => {
  const response = await fetch(`${BASE_URL}/remove/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

/* GET user by ID */
export const getPersonById = async (id) => {
  const response = await fetch(`${BASE_URL}/getid/${id}`);
  return response.json();
};

/* GET user by name */
export const getPersonByName = async (name) => {
  const response = await fetch(`${BASE_URL}/getname/${name}`);
  return response.json();
};
