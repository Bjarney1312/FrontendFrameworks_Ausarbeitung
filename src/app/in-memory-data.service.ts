import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Reptile} from "./reptile";


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
        ordnung: 'Schlange',
        art: 'Westliche Hakennasennatter',
        morph: 'Superconda het. Toxic'
      },
      {
        id: 2,
        name: 'Tifa',
        geburtsdatum: 'NZ21',
        ordnung: 'Schlange',
        art: 'Boa Constrictor Imperator',
        morph: 'IMG het. Leopard'
      },
      {
        id: 3,
        name: 'Hektor',
        geburtsdatum: 'NZ21',
        ordnung: 'Schlange',
        art: 'Boa Constrictor Constrictor',
        morph: 'Classic'
      },
      {
        id: 4,
        name: 'Hubert',
        geburtsdatum: 'NZ20',
        ordnung: 'Schlange',
        art: 'Westliche Hakennasennatter',
        morph: 'Superconda het. Toxic'
      },
      {
        id: 5,
        name: 'Tifa',
        geburtsdatum: 'NZ21',
        ordnung: 'Schlange',
        art: 'Boa Constrictor Imperator',
        morph: 'IMG het. Leopard'
      },
      {
        id: 6,
        name: 'Hektor',
        geburtsdatum: 'NZ21',
        ordnung: 'Schlange',
        art: 'Boa Constrictor Constrictor',
        morph: 'Classic'
      }
    ];
    return {reptiles};
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
