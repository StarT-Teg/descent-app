import {HeroPlayersEnum} from "../../shared";
import {floatClearing} from "../mathHelpers";
import {useOverlordDataContext} from "../../context/overlord-data-context";
import {useHeroesDataContext} from "../../context";
import {useGameSaveContext} from "../../context/game-save-context";


export function useBrFunctions() {

    const {campaignsData, overlordCards, monsters, lieutenants, relics} = useOverlordDataContext();
    const {heroes, heroClasses, items} = useHeroesDataContext()

    const {overlordPicks, campaignPicks, heroesPicks} = useGameSaveContext();
    const {selectedCampaign, selectedMission, selectedEncounter, selectedAct} = campaignPicks
    const {pickedCards, pickedMonsters, pickedRelics, customActPicks} = overlordPicks;

    const numberOfHeroes = Object.keys(heroesPicks).length;
    const currentAct = ('act' + selectedAct) as 'act1' | 'act2';

    function getMonsterGroupBr(monsterName: string, customSelectedAct?: 1 | 2) {
        if (!selectedAct && !customSelectedAct) {
            return 0;
        }

        let act: 'act1' | 'act2';

        if (!!customSelectedAct) {
            act = ('act' + customSelectedAct) as 'act1' | 'act2';
        } else {
            act = customActPicks?.includes(monsterName) ? selectedAct === 2 ? 'act1' : 'act2' : currentAct;
        }

        return Object.values(monsters?.[monsterName]?.[act] || {}).reduce((brAcc: number, monsterValue) => {
            const monsterAmount = monsterValue.groupSize[String(numberOfHeroes)];
            return Math.round(brAcc + (floatClearing(monsterValue.br) * monsterAmount));
        }, 0);
    }

    function getLieutenantBr(lieutenantName: string, customSelectedAct?: 1 | 2): number {

        if (!selectedAct && !customSelectedAct) {
            return 0;
        }

        let act: 'act1' | 'act2';

        if (!!customSelectedAct) {
            act = ('act' + customSelectedAct) as 'act1' | 'act2';
        } else {
            act = customActPicks?.includes(lieutenantName) ? selectedAct === 2 ? 'act1' : 'act2' : currentAct;
        }

        const baseBr = lieutenants[lieutenantName]?.[act]?.br || 0;
        const additionalBr = lieutenants[lieutenantName][act]?.stats?.[numberOfHeroes].br || 0;

        return Math.round(baseBr + additionalBr);
    }

    function getHeroBr(heroPosition: HeroPlayersEnum): number {

        const heroPicks = heroesPicks?.[heroPosition];
        let heroBr: number = 0;
        if (!!heroPicks?.heroName) {
            heroBr += floatClearing(heroes?.[heroPicks?.heroName]?.br);
        }

        if (!!heroPicks?.heroSkills?.length) {
            heroPicks.heroSkills.forEach((skillName) => {
                const skillList = Object.values(heroClasses).reduce((acc: { [key in string]: string }, classData) => {
                    const skills = Object.values(classData.skills).reduce((acc: { [key in string]: string }, skillData) => ({
                        ...acc,
                        [skillData.skillName]: skillData.br
                    }), {});
                    return {...acc, ...skills}
                }, {})

                heroBr += floatClearing(skillList[skillName])
            })
        }

        if (!!heroPicks?.heroItems?.length) {
            heroPicks.heroItems.forEach((itemName) => {
                const itemData = items?.[itemName];
                if (!!itemData) {
                    if (itemData.equip === 'One Hand' && heroPicks.heroItems?.some(item => (itemName !== item && itemData.equip === 'One Hand' && !!itemData.dice))) {
                        heroBr += floatClearing(itemData.br) * 0.75;
                    } else {
                        heroBr += floatClearing(itemData.br);
                    }
                }
            })
        }

        return Math.round(heroBr);
    }

    function getOverlordBr() {

        let overlordBr: number = 0;

        if (!Object.keys(overlordPicks).length) {
            return overlordBr;
        }

        if (!!pickedCards?.length) {
            pickedCards.forEach(cardName => {
                overlordBr += overlordCards[cardName].br;
            })

            if (pickedCards?.includes('Call of the Ravens')) {
                overlordBr += getMonsterGroupBr('Raven Flock')
            }
            if (pickedCards?.includes('Ties That Bind')) {
                overlordBr += getMonsterGroupBr('Scourge')
            }
        }

        if (!!pickedMonsters?.length && !!campaignPicks?.selectedAct) {
            pickedMonsters.forEach(monsterName => {
                overlordBr += getMonsterGroupBr(monsterName);
            })
        }

        if (!!selectedCampaign && !!selectedMission && !!selectedEncounter) {

            if (!!Object.keys(pickedRelics || {}).length) {
                Object.keys(pickedRelics || {}).forEach((lieutenantName) => {
                    const isLieutenantAvailable = !!campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].lieutenants.includes(lieutenantName)
                    const relicName = pickedRelics?.[lieutenantName];

                    if (isLieutenantAvailable && !!relicName) {
                        overlordBr += relics[relicName].br
                    }
                })
            }

            campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].lieutenants.forEach(lieutenantName => {
                overlordBr += getLieutenantBr(lieutenantName);
            })

            campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].monsters.forEach(monsterName => {
                overlordBr += getMonsterGroupBr(monsterName);
            })
        }

        return Math.round(overlordBr);
    }

    function getOverlordAvailableBr() {
        const heroesBR = Object.keys(heroesPicks).reduce((acc: number, heroPosition: string) => acc + getHeroBr(heroPosition as HeroPlayersEnum), 0)
        const overlordBR = getOverlordBr();

        return Math.round(heroesBR - overlordBR);
    }

    function getItemBr(itemName: string) {
        return Math.round(floatClearing(items[itemName]?.br));
    }

    return {
        getMonsterGroupBr,
        getLieutenantBr,
        getHeroBr,
        getOverlordBr,
        getOverlordAvailableBr,
        getItemBr
    }
}