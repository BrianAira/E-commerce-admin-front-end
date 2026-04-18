// import * as categoriesApi from "../api/categories";
// import type { ICategory } from "../types/Product";

import { api } from "../../../api/axiosClient";
import type { ICategory } from "../types/product";

export const categoriesService = {

    getAll: async (): Promise<ICategory[]> => {
    // Si tu API sigue la convención de FastAPI, el endpoint suele ser /categories/
    const { data } = await api.get<ICategory[]>("/categories/");
    return data;
  },

  // Crear una nueva categoría
  // Recibe un objeto parcial (solo el nombre) y devuelve la categoría completa con su ID
  create: async (categoryName: string): Promise<ICategory> => {
    const { data } = await api.post<ICategory>("/categories/", { 
      name: categoryName 
    });
    return data;
  },
  getById: async (id: number): Promise<ICategory> => {
    const { data } = await api.get<ICategory>(`/categories/${id}`);
    return data;
  },
};