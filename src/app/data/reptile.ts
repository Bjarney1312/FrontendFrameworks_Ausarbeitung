import {Feeding} from "./feeding";
import {Weight} from "./weight";
import {Note} from "./note";
import {Breeder} from "./breeder";

export interface Reptile {
  id: string;
  name: string;
  geburtsdatum: string;
  geschlecht: string;
  ordnung: string;
  art: string;
  morph: string;
  feedings: Feeding[];
  weight: Weight[];
  notes: Note[];
  breeder: Breeder;
}
