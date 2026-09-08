// Shared API helper for FUNDme frontend pages.
// Change API_BASE to your deployed backend URL (e.g. Render).
const API_BASE = window.FUNDME_API_BASE || 'https://yesfundme.onrender.com/api';

function authHeaders() {
  const token = localStorage.getItem('fundme_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? authHeaders() : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

function formatKsh(amount) {
  return 'KSh ' + Number(amount || 0).toLocaleString('en-KE', { maximumFractionDigits: 0 });
}

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('fundme_user') || 'null'); }
  catch { return null; }
}

function requireLogin() {
  if (!localStorage.getItem('fundme_token')) {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('fundme_token');
  localStorage.removeItem('fundme_user');
  window.location.href = 'login.html';
}
