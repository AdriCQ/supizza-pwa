import type { Complement, Drink, Ingredient, Pizza, Promo } from "@/types";
import type { AxiosInstance } from "axios";

export const offerServices = (api: AxiosInstance) => ({
  listComplement: () => api.get<Complement[]>("/api/complementosApp"),
  listDrink: () => api.get<Drink[]>("/api/bebidasApp"),
  listIngredient: () => api.get<Ingredient[]>("/api/ingredientesApp"),
  listPizza: () => api.get<Pizza[]>("/api/pizzasApp"),
  listPromo: () => api.get<Promo[]>("/api/promosApp"),
});
