import { getUserUid } from "./user";
const API_URL = "http://localhost:3000/api";

export async function accusePedestrian(pedestrianUid) {

  const userUid = getUserUid();

  const response = await fetch(`${API_URL}/investigation/accuse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pedestrianUid,
      userUid,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to make accusation");
  }

  return data;
}
