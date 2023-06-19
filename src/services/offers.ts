import type { Complement, Drink, PizzaIngredient, Pizza, Promo } from "@/types";
import type { AxiosInstance } from "axios";

export const offerServices = (api: AxiosInstance) => ({
  listComplement: () => api.get<Complement[]>("/api/complementosApp"),
  listDrink: () => api.get<Drink[]>("/api/bebidasApp"),
  listIngredient: () => api.get<PizzaIngredient[]>("/api/ingredientesApp"),
  listPizza: () => api.get<Pizza[]>("/api/pizzasApp"),
  listPromo: () => api.get<Promo[]>("/api/promosApp"),
});
