// Category API calls
import api from "../api";

export const getCategories = () => api.get("/Categories").then((r) => r.data);
export const createCategory = (cat) =>
  api.post("/Categories", cat).then((r) => r.data);
export const updateCategory = (id, cat) => api.put(`/Categories/${id}`, cat);
export const deleteCategory = (id) => api.delete(`/Categories/${id}`);
