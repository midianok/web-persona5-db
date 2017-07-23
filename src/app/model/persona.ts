export interface Persona {
  name?: string;
  arcana: string;
  level: number;
  stats: number[];
  elems: string[];
  skills: {
    [index: string]: number;
  };
  personality?: string;
  special?: boolean;
  max?: boolean;
  dlc?: boolean;
  note?: string;
  rare?: boolean;
  strength?: number;
  magic?: number;
  endurance?: number;
  agility?: number;
  luck?: number;

  physical?: string;
  gun?: string;
  fire?: string;
  ice?: string;
  electric?: string;
  wind?: string;
  psychic?: string;
  nuclear?: string;
  bless?: string;
  curse?: string;
  physicalValue?: number;
  gunValue?: number;
  fireValue?: number;
  iceValue?: number;
  electricValue?: number;
  windValue?: number;
  psychicValue?: number;
  nuclearValue?: number;
  blessValue?: number;
  curseValue?: number;
}
