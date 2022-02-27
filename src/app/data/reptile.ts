import {Feeding} from "./feeding";
import {Weight} from "./weight";
import {Note} from "./note";
import {Breeder} from "./breeder";

export interface Reptile {
  id: string;
  name: string;
  birthday: string;
  gender: string;
  species: string;
  type: string;
  morph: string;
  feedings: Feeding[];
  weight: Weight[];
  notes: Note[];
  breeder: Breeder;
  imageURL: string;
}
