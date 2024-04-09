import {useGameSaveContext} from "../../context/game-save-context";
import {useOverlordDataContext} from "../../context/overlord-data-context";
import {useBrFunctions} from "./useBrFunctions";


export function useGetOverlordPicks() {

    const {getMonsterGroupBr} = useBrFunctions();

    const {campaignsData, overlordCards, monsters, lieutenants, relics} = useOverlordDataContext();

    const {overlordPicks, campaignPicks, heroesPicks} = useGameSaveContext();
    const {pickedCards} = overlordPicks;
    const {selectedCampaign, selectedMission, selectedEncounter, selectedAct} = campaignPicks

    function getOverlordFamiliars(): string[] {
        const overlordFamiliars = [];
        if (pickedCards?.includes('Call of the Ravens')) {
            overlordFamiliars.push('Raven Flock')
        }
        if (pickedCards?.includes('Ties That Bind')) {
            overlordFamiliars.push('Scourge')
        }

        return overlordFamiliars;
    }

    function getOverlordDefaultMonsters(): string[] {
        const defaultMonsters = (campaignsData?.[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.monsters || []);
        const familiars = getOverlordFamiliars();

        return defaultMonsters.concat(familiars);
    }

    function getOverlordDefaultLieutenants(): string[] {
        if (!selectedCampaign || !selectedMission || !selectedEncounter) {
            return []
        }

        return campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].lieutenants || [];
    }

    function getOverlordOpenGroups(): string[] {
        const newOpenGroups: string[] = [];
        const defaultMonsters = getOverlordDefaultMonsters();

        if (!!selectedCampaign && !!selectedMission && !!selectedEncounter) {

            const act: 'act1' | 'act2' = 'act' + campaignsData[selectedCampaign][selectedMission].act as 'act1' | 'act2';
            const availableTraits = campaignsData[selectedCampaign][selectedMission]?.encounters?.[selectedEncounter].openGroupsTraits;

            Object.values(monsters).forEach(monsterData => {
                const newMonster = monsterData?.[act]?.master;
                const isMonsterSizeValid = campaignsData?.[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.isOnlySmallMonsters ? Number(newMonster?.size) === 1 : true;

                if (newMonster?.traits?.some(r => isMonsterSizeValid && availableTraits?.includes(r)) && !defaultMonsters.includes(newMonster.name)) {
                    newOpenGroups.push(newMonster.name)
                }
            })
        }

        return newOpenGroups.sort((a, b) => (getMonsterGroupBr(b, (selectedAct as 1 | 2) || 1) - getMonsterGroupBr(a, (selectedAct as 1 | 2) || 1)))
    }

    function getOpenGroupLimit(): number {
        return campaignsData[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.openGroupsAmount || 0;
    }

    const isMonsterChangeActAvailable = (monsterName: string) => {
        return !campaignsData?.[selectedCampaign || '']?.[selectedMission || '']?.encounters?.[selectedEncounter || 0]?.cantChangeActMonsterList?.includes(monsterName)
    }

    return {
        getOverlordFamiliars,
        getOverlordDefaultMonsters,
        getOverlordDefaultLieutenants,
        getOverlordOpenGroups,
        getOpenGroupLimit,
        isMonsterChangeActAvailable
    }
}