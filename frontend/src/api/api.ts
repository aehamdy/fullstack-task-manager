import axios from "axios";

const API_URL = "http://localhost:3000/api";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: string;
  created_at: string;
}

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => axios.post<{ user: User; token: string }>(`${API_URL}/register`, data);

export const loginUser = (data: { email: string; password: string }) =>
  axios.post<{ user: User; token: string }>(`${API_URL}/login`, data);

export const getTasks = (token: string) =>
  axios.get<Task[]>(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = (
  data: { title: string; description?: string },
  token: string
) =>
  axios.post<Task>(`${API_URL}/tasks`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = (
  id: number,
  data: { title?: string; description?: string; status?: string },
  token: string
) =>
  axios.put<Task>(`${API_URL}/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = (id: number, token: string) =>
  axios.delete<{ message: string }>(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
