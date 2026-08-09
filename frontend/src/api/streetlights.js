const API_URL = "http://localhost:3000/api";

export async function getStreetlights() {
  const response = await fetch(`${API_URL}/streetlights`);

  if (!response.ok) {
    throw new Error("Failed to get streetlights");
  }

  return response.json();
}
