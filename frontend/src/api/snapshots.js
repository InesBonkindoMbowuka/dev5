const API_URL = "http://localhost:3000/api";

export async function getSnapshots() {
  const response = await fetch(`${API_URL}/snapshots`);

  if (!response.ok) {
    throw new Error("Failed to get snapshots");
  }

  return response.json();
}
