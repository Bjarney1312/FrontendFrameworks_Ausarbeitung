import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Reptile} from "./data/reptile";
import {Feeding} from "./data/feeding";
import {Weight} from "./data/weight";
import {Note} from "./data/note";
import {Breeder} from "./data/breeder";


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let breeders: Breeder[] = [
      {
        id: '0',
        companyName: '',
        firstName: 'Unbekannt',
        lastName: '',
        street: '',
        postal: '',
        place: '',
        country: '',
        email: '',
        phone: ''
      },
      {
        id: '1',
        companyName: 'Reptifit',
        firstName: 'Wilco',
        lastName: 'van Ee',
        street: '',
        postal: '',
        place: 'Apeldoorn',
        country: 'Niederlande',
        email: 'info@reptifit.nl',
        phone: ''
      },
     ];

    let reptiles: Reptile[] = [
      {
        id: '1',
        name: 'Hubert',
        birthday: 'NZ20',
        gender: 'Männlich',
        species: 'Schlange',
        type: 'Westliche Hakennasennatter',
        morph: 'Superconda het. Toxic',
        feedings: [],
        weight: [],
        notes: [],
        breeder: breeders[1],
        imageURL: 'https://i.ibb.co/T1rggYm/Hubert.png',
      },
      {
        id: '2',
        name: 'Tifa',
        birthday: 'NZ21',
        gender: 'Weiblich',
        species: 'Schlange',
        type: 'Boa Constrictor Imperator',
        morph: 'IMG het. Leopard',
        feedings: [],
        weight: [],
        notes: [],
        breeder: breeders[0],
        imageURL: 'https://i.ibb.co/109Gkpr/Tifa.jpg',
      },
      {
        id: '3',
        name: 'Hektor',
        birthday: 'NZ21',
        gender: 'Männlich',
        species: 'Schlange',
        type: 'Boa Constrictor Constrictor',
        morph: 'Classic',
        feedings: [],
        weight: [],
        notes: [],
        breeder: breeders[0],
        imageURL: 'https://i.ibb.co/BLnjXz7/Hektor.jpg',
      },
    ];

    const feedings: Feeding[] = [
      {
        id: '1',
        date: new Date().toLocaleDateString(),
        type: 'Specki',
        weight: 5.0,
      },
      {
        id: '2',
        date: new Date().toLocaleDateString(),
        type: 'Specki XL',
        weight: 4.0,
      }
    ];

    const weight: Weight[] = [
      {
        id: '1',
        date: new Date().toLocaleDateString(),
        weight: 78.6,
      },
      {
        id: '2',
        date: new Date().toLocaleDateString(),
        weight: 82.9,
      }
    ];

    const notes: Note[] = [
      {
        id: '1',
        date: new Date().toLocaleDateString(),
        note: 'Alles in Ordnung',
      },
      {
        id: '2',
        date: new Date().toLocaleDateString(),
        note: 'Futter verweigert, Häutung steht an',
      }
    ];

    reptiles[0].feedings.push(feedings[0]);
    reptiles[0].feedings.push(feedings[1]);

    reptiles[0].weight.push(weight[0]);
    reptiles[0].weight.push(weight[1]);

    reptiles[0].notes.push(notes[0]);
    reptiles[0].notes.push(notes[1]);

    if(localStorage.getItem('reptiles') !== null){
      breeders = JSON.parse(<string>localStorage.getItem('breeders')) || []
      reptiles = JSON.parse(<string>localStorage.getItem('reptiles')) || []
      return {reptiles, breeders};
    }
    else{
      localStorage.setItem('reptiles', JSON.stringify(reptiles))
      localStorage.setItem('breeders', JSON.stringify(breeders))
      return {reptiles, breeders};
    }
  }
}
