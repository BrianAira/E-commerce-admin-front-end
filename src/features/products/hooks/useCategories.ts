import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";
import type { ICategory } from "../types/product";

/**
 * Hook para listar categorías (con caché de 30 minutos ya que cambian poco)
 */
export const useCategories = () => {
  return useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};

/**
 * Hook para crear una categoría
 */
export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation<ICategory, Error, string>({
    mutationFn: (name) => categoriesService.create(name),
    onSuccess: () => {
      // Invalidamos para que los Selects de productos se actualicen con la nueva opción
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};