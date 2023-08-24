import { Beer } from "../types";

export interface DatabaseInterface {
  getBeerById(id: string | undefined): Beer | undefined;
  getAllBeers(): Beer[];
  saveBeer(beer: Beer): Beer;
  deleteBeerById(id: string | undefined): void;
  deleteAllBeers(): void;
}