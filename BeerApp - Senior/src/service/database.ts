import { Beer } from "../types";
import { DatabaseInterface } from "./database_interface";

class Database implements DatabaseInterface {

  getBeerById(id: string | undefined): Beer | undefined {
    if (!id) return;
    const beers = localStorage.getItem('beers');
    if (!beers) return;

    const mBeers: Record<string, Beer> = JSON.parse(beers);
    return mBeers[id];
  }

  getAllBeers(): Beer[] {
    const beers = localStorage.getItem('beers');
    if (!beers) return [];

    const mBeers: Record<string, Beer> = JSON.parse(beers);
    const mArrayBeers = Object.values(mBeers);
    return mArrayBeers;
  }

  saveBeer(beer: Beer): Beer {
    const beers = localStorage.getItem('beers') || '{}';

    const mBeers: Record<string, Beer> = JSON.parse(beers);
    mBeers[beer.id] = beer;
    localStorage.setItem('beers', JSON.stringify(mBeers));
    return beer;
  }

  deleteBeerById(id: string | undefined) {
    if (!id) return;
    const beers = localStorage.getItem('beers') || '{}';
    const mBeers: Record<string, Beer> = JSON.parse(beers);
    delete mBeers[id];
    localStorage.setItem('beers', JSON.stringify(mBeers));
  }

  deleteAllBeers() {
    localStorage.setItem('beers', '{}');
  }
}

export const database = new Database();
