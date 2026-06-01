import {useEffect} from "react";
import {DataReducerActionsEnum, useHeroesDataDispatchContext} from "../../context";
import {useOverlordDataDispatchContext} from "../../context/overlord-data-context";
import {campaignsDataAdapted} from "../../dataHooks/dataAdapters/campaignsDataAdapted";
import {heroClassesDataAdapter} from "../../dataHooks/dataAdapters/heroClassesDataAdapter";
import {heroesRawDataAdapter} from "../../dataHooks/dataAdapters/heroesRawDataAdapter";
import {itemsDataAdapter} from "../../dataHooks/dataAdapters/itemsDataAdapter";
import {lieutenantsDataAdapter} from "../../dataHooks/dataAdapters/lieutenantsDataAdapter";
import {monstersDataAdapter} from "../../dataHooks/dataAdapters/monstersDataAdapter";
import {overlordDecksDataAdapted} from "../../dataHooks/dataAdapters/overlordDecksDataAdapted";
import {overlordRelicsDataAdapter} from "../../dataHooks/dataAdapters/overlordRelicsDataAdapter";
import {familiarsDataAdapted} from "../../dataHooks/dataAdapters/familiarsDataAdapted";
import {abilitiesDataAdapted} from "../../dataHooks/dataAdapters/abilitiesDataAdapted";
import {translationDataAdapted} from "../../dataHooks/dataAdapters/translationDataAdapted";
import {agentsDataAdapter} from "../../dataHooks/dataAdapters/agentsDataAdapter";
import {plotCardsDataAdapted} from "../../dataHooks/dataAdapters/plotCardsDataAdapted";
import {useGetData} from "../../dataHooks";
import {useGameSaveDispatchContext} from "../../context/game-save-context";
import {LOCAL_STORAGE_LANGUAGE_KEY} from "../../shared";
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";

export const useInitGameData = () => {
    const {data: gameData, isLoading: dataIsLoading} = useGetData();

    const dispatchHeroesData = useHeroesDataDispatchContext();
    const dispatchOverlordData = useOverlordDataDispatchContext();
    const dispatchGameSave = useGameSaveDispatchContext()

    useEffect(() => {
        if (!gameData) {
            return;
        }

        const {
            heroesData,
            heroClassesData,
            itemsData,
            overlordDecksData,
            lieutenantsData,
            relicsData,
            monstersData,
            campaignData,
            familiars,
            abilitiesData,
            agentsData,
            plotDeckData,
            translationData
        } = gameData;

        const translation = translationDataAdapted(translationData);

        const selectedLanguageFormStorage: string | null = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);
        const firstLanguageFormData: string | undefined = translationData?.values?.[0]?.[0];

        if (!selectedLanguageFormStorage) {
            if (firstLanguageFormData) {
                localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, firstLanguageFormData);
            }
        }

        dispatchGameSave({
            actionType: GameSaveReducerActionTypeEnum.changeLanguage,
            payload: selectedLanguageFormStorage || firstLanguageFormData || '',
        });

        dispatchHeroesData({
            payload: {
                heroes: heroesRawDataAdapter(heroesData, translation),
                heroClasses: heroClassesDataAdapter(heroClassesData, translation),
                items: itemsDataAdapter(itemsData, translation),
                familiars: familiarsDataAdapted(familiars, translation),
            },
            actionType: DataReducerActionsEnum.update,
        });

        dispatchOverlordData({
            payload: {
                overlordCards: overlordDecksDataAdapted(overlordDecksData, translation),
                plotCards: plotCardsDataAdapted(plotDeckData, translation),
                lieutenants: lieutenantsDataAdapter(lieutenantsData, translation),
                relics: overlordRelicsDataAdapter(relicsData, translation),
                agents: agentsDataAdapter(agentsData),
                monsters: monstersDataAdapter(monstersData, translation),
                campaignsData: campaignsDataAdapted(campaignData, translation),
                abilitiesData: abilitiesDataAdapted(abilitiesData, translation),
            },
            actionType: DataReducerActionsEnum.update,
        });
    }, [gameData, dispatchHeroesData, dispatchOverlordData, dispatchGameSave]);

    return {isLoading: dataIsLoading};
};
