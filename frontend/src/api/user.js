const API_URL = "http://localhost:3000/api";

export function getUserUid() {
  let uid = localStorage.getItem("userUid");

  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem("userUid", uid);
  }

  return uid;
}

export async function registerUser() {
  const userUid = getUserUid();

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userUid: userUid,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}
