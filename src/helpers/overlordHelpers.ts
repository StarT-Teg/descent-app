import {CampaignPicksInterface, CampaignsDataAdapted, CurrentOverlordPicks, MonstersDataAdapted} from "../types/shared";


export const calculateOverlordMonsters = (props: {
    campaignsData: CampaignsDataAdapted,
    overlordPicks: CurrentOverlordPicks,
    campaignPicks: CampaignPicksInterface,
    monsters: MonstersDataAdapted
}) => {

    const {campaignsData, campaignPicks, overlordPicks, monsters} = props;
    const {selectedCampaign, selectedMission, selectedEncounter, selectedAct} = campaignPicks;
    const {pickedCards} = overlordPicks;

    const overlordFamiliars = [];
    if (pickedCards?.includes('Call of the Ravens')) {
        overlordFamiliars.push('Raven Flock')
    }
    if (pickedCards?.includes('Ties That Bind')) {
        overlordFamiliars.push('Scourge')
    }

    const defaultMonsters = (campaignsData?.[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.monsters || []);

    const monstersList: string[] = [...defaultMonsters, ...overlordFamiliars];

    if (!!selectedCampaign && !!selectedMission && !!selectedEncounter && !!selectedAct) {

        const act: 'act1' | 'act2' = 'act' + selectedAct as 'act1' | 'act2';
        const availableTraits = campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].openGroupsTraits;

        Object.values(monsters).forEach(monsterData => {
            const newMonster = monsterData?.[act]?.master;

            if (newMonster?.traits?.some(r => availableTraits?.includes(r)) && !defaultMonsters.includes(newMonster.name)) {
                monstersList.push(newMonster.name)
            }
        })
    }

    return monstersList;
}