export class Skill{
  name: string;
  cost?: number;
  effect?: string;
  element?: string;
  fuse?: string;
  talk?: string;
  pesonas: Array<{name: string, level: number}> = [];
}
