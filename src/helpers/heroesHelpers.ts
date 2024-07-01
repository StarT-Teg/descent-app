import {HeroPlayerPicks} from "../shared";

const familiarFromSkillList: { [key in string]: string } = {
    'Stone Tongue': 'The Summoned Stone',
    'Ley Line': 'The Summoned Stone',
}

export const getHeroFamiliars = (playerPicks?: HeroPlayerPicks): string[] => {

    const newFamiliars: string[] = [];

    if (!!playerPicks?.heroName) {
        switch (playerPicks.heroName) {
            case 'Vyrah the Falconer':
                newFamiliars.push('Skye');
                break;
            case 'Ronan of the Wild':
                newFamiliars.push('Pico');
                break;
            case 'Challara':
                newFamiliars.push('Brightblaze');
                break;
        }
    }

    if (!!playerPicks?.heroClassName) {
        switch (playerPicks.heroClassName) {
            case "Necromancer":
                newFamiliars.push('Reanimate')
                break;
            case "Geomancer":
                newFamiliars.push('The Summoned Stone')
                break;
            case "Beastmaster":
                newFamiliars.push('Wolf')
                break;
            case "Shadow Walker":
                newFamiliars.push('Shadow Soul')
                break;
            default:
                break;
        }
    }

    if (!!playerPicks?.heroSkills?.length) {
        playerPicks.heroSkills.forEach((skillName) => {
            const familiar = familiarFromSkillList?.[skillName];
            !!familiar && newFamiliars.push(familiar);
        })
    }

    return newFamiliars;
}