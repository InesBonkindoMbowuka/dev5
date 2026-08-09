const API_URL = "http://localhost:3000/api";

export async function getDetections() {
  const response = await fetch(`${API_URL}/detections`);

  if (!response.ok) {
    throw new Error("Failed to get detections");
  }

  return response.json();
}
