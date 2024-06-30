import {CurrentPlayersPicks, GameSavePicks, HeroPlayerPicks, HeroPlayersEnum} from "../../shared";


export const saveGameDataTranslated = (saveGame: GameSavePicks, translation?: { [key: string]: string }): GameSavePicks => {
    const heroesPicks: CurrentPlayersPicks = Object.keys(saveGame.heroesPicks).reduce((acc: CurrentPlayersPicks, heroPosition: string) => {

        const heroData: HeroPlayerPicks = {...saveGame.heroesPicks[heroPosition as HeroPlayersEnum]!};

        heroData.heroName = !!heroData?.heroName && !!translation?.[heroData.heroName] ? translation[heroData?.heroName] : heroData?.heroName;
        heroData.heroClassName = !!heroData?.heroClassName && !!translation?.[heroData.heroClassName] ? translation[heroData?.heroClassName] : heroData?.heroClassName;
        heroData.heroSubclassName = !!heroData?.heroSubclassName && !!translation?.[heroData.heroSubclassName] ? translation[heroData?.heroSubclassName] : heroData?.heroSubclassName;
        heroData.heroItems = heroData?.heroItems?.map(itemName => translation?.[itemName] || itemName);
        heroData.heroSkills = heroData?.heroSkills?.map(skillName => translation?.[skillName] || skillName);

        return {...acc, [heroPosition]: {...heroData}}
    }, {})

    return {
        ...saveGame,
        heroesPicks,
    }
}