const API_BASE_URL = import.meta.env.VITE_API_URL

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  bands: `${API_BASE_URL}/bands`,
  brotherhoods: `${API_BASE_URL}/brotherhoods`,
  contracts: `${API_BASE_URL}/contracts`,
  availabilities: `${API_BASE_URL}/availabilities`,
  processions: `${API_BASE_URL}/processions`,
  dashboard: `${API_BASE_URL}/dashboard/count`,
  login: `${API_BASE_URL}/login`,
  logout: `${API_BASE_URL}/logout`,
  profile: `${API_BASE_URL}/me`
};