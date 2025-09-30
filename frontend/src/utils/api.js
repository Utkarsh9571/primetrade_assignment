const API = process.env.REACT_APP_API_BASE;

export async function loginOrSignup(form, isSignup) {
  const endpoint = isSignup ? "auth/sign-up" : "auth/sign-in";
  const res = await fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}

export async function fetchNotes(token) {
  const res = await fetch(`${API}/note`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createNote(note, token) {
  const res = await fetch(`${API}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(id, token) {
  const res = await fetch(`${API}/note/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function updateNote(id, updatedFields, token) {
  const res = await fetch(`${API}/note/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields),
  });
  return res.json();
}
