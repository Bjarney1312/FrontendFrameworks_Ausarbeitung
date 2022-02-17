import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Reptile} from "./data/reptile";


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const reptiles = [
      {
        id: 1,
        name: 'Hubert',
        geburtsdatum: 'NZ20',
        geschlecht: 'Männlich',
        ordnung: 'Schlange',
        art: 'Westliche Hakennasennatter',
        morph: 'Superconda het. Toxic'
      },
      {
        id: 2,
        name: 'Tifa',
        geburtsdatum: 'NZ21',
        geschlecht: 'Weiblich',
        ordnung: 'Schlange',
        art: 'Boa Constrictor Imperator',
        morph: 'IMG het. Leopard'
      },
      {
        id: 3,
        name: 'Hektor',
        geburtsdatum: 'NZ21',
        geschlecht: 'Männlich',
        ordnung: 'Schlange',
        art: 'Boa Constrictor Constrictor',
        morph: 'Classic'
      },
    ];

    const feedings = [
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: 2,
        reptileid: 1,
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      },
      {
        id: 1,
        reptileid: 2,
        date: new Date().toLocaleDateString(),
        type: 'Maus XXL',
        weight: 35.0,
      },

    ];
    return {reptiles, feedings};
  }

  // Overrides the genId method to ensure that a user always has an id.
  // If the users array is empty,
  // the method below returns the initial number (11).
  // if the users array is not empty, the method below returns the highest
  // user id + 1.
  genId(reptiles: Reptile[]): number {
    return reptiles.length > 0 ? Math.max(...reptiles.map(reptile => reptile.id)) + 1 : 1;
  }
}
