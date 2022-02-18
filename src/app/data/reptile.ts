import {Feeding} from "./feeding";

export interface Reptile {
  id: string;
  name: string;
  geburtsdatum: string;
  geschlecht: string;
  ordnung: string;
  art: string;
  morph: string;
  feedings: Feeding[];
}
