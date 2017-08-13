export class Skill{
  name: string;
  cost?: number;
  effect?: string;
  element?: string;
  fuse?: string;
  talk?: string;
  personas: Array<{name: string, level: number}> = [];
  getPersonaSkillLevel(name: string): number{
    const persona = this.personas.find(x => x.name === name);
    return persona.level;
  }
}
