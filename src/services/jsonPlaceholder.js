// services/jsonPlaceHolder.js
const API_URL = "https://jsonplaceholder.typicode.com";

export async function getComentarios() {
  const response = await fetch(`${API_URL}/comments`);
  const data = await response.json();
  return data;
}
