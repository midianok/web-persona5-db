import {Inject} from "@angular/core";
import {SkillRepository} from "../data/skill-repository";
import {Skill} from "../model/skill";

export class SkillService {
  constructor(@Inject(SkillRepository) private skillRepository) {}

  getSkillByName(skillName: string): Skill {
    return this.getAllSkills().find(x => x.name === skillName);
  }

  getSkillsByPersonaName(personaName: string): Array<Skill> {
    return this.getAllSkills().filter(x =>
      x.personas.some(
        z => z.name === personaName
      )
    );
  }

  getAllSkills(): Array<Skill>{
    const skills = [];
    for (const skillKey in this.skillRepository.skillsData){
      if (!this.skillRepository.skillsData.hasOwnProperty(skillKey)){
        continue;
      }
      const rawSkill = this.skillRepository.skillsData[skillKey];

      const skill = new Skill();
      skill.name = skillKey;
      skill.cost = rawSkill.cost;
      skill.effect = rawSkill.effect;
      skill.element = rawSkill.element;
      skill.fuse = rawSkill.fuse;
      skill.talk = rawSkill.talk;
      for (const personaKey in rawSkill.personas) {
        if (!rawSkill.personas.hasOwnProperty(personaKey)){
          continue;
        }
        skill.personas.push({name: personaKey, level: rawSkill.personas[personaKey]});
      }
      skills.push(skill);
    }
    return skills;
  }
}
