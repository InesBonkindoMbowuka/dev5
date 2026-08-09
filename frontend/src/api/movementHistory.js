const API_URL = "http://localhost:3000/api";

export async function getMovementHistory(uid) {
  const response = await fetch(
    `${API_URL}/movement-history/${uid}`
  );

  if (!response.ok) {
    throw new Error("Failed to get movement history");
  }

  return response.json();
}
