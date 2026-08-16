export function getUserUid() {
  let uid = localStorage.getItem("userUid");

  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem("userUid", uid);
  }

  return uid;
}
