import axios from "axios";
import type { Book } from "../types/book"
const API_URL = "http://localhost:8000";

export const getBooks = (sortBy = "id") => {
  return axios.get<Book[]>(`${API_URL}/books`, {
    params: { sort_by: sortBy },
  });
};

export const createBook = (data: Omit<Book, "id">) => {
  return axios.post<Book>(`${API_URL}/books`, data);
};

export const searchBooks = (q: string, skip = 0, limit = 20) => {
  return axios.get<Book[]>(`${API_URL}/books/search`, {
    params: {
      q,
      skip,
      limit,
    },
  });
};

export const healthCheck = () => {
  return axios.get(`${API_URL}/health`);
};