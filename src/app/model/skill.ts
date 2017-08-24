export class Skill{
  name: string;
  cost?: number;
  costString?: string;
  effect?: string;
  element?: string;
  fuse?: string;
  talk?: string;
  personas: Array<{name: string, level: number}> = [];
  level?: number;
  getPersonaSkillLevel(name: string): number{
    const persona = this.personas.find(x => x.name === name);
    return persona.level;
  }
}
