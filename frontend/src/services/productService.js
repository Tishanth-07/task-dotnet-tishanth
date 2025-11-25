// Product API calls
import api from "../api";

export const getProducts = (params = {}) =>
  api.get("/Products", { params }).then((r) => r.data);
export const getProduct = (id) =>
  api.get(`/Products/${id}`).then((r) => r.data);
export const createProduct = (product) =>
  api.post("/Products", product).then((r) => r.data);
export const updateProduct = (id, product) =>
  api.put(`/Products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/Products/${id}`);
