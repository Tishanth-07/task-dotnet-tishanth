import api from "../api/api";

export const getCategories = () => api.get("/categories").then(r => r.data);
export const createCategory = (cat) => api.post("/categories", cat).then(r => r.data);
export const updateCategory = (id, cat) => api.put(`/categories/${id}`, cat);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
