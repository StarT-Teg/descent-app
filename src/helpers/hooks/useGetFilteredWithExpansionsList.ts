import {useGameSaveContext} from "../../context/game-save-context";
import {HeroesDataAdapted, ItemsDataAdapted, OverlordCardsDataAdapted} from "../../shared";
import {useCallback} from "react";


export const useGetFilteredWithExpansionsList = () => {
    const {selectedExpansions} = useGameSaveContext();

    const getFilteredList = useCallback((dataList: ItemsDataAdapted | HeroesDataAdapted | OverlordCardsDataAdapted) => Object.keys(dataList).reduce((dataAcc: {}, name) => {
        const expansion = dataList?.[name]?.expansion;

        if (!expansion || !selectedExpansions?.length || selectedExpansions.includes(expansion)) {
            return {...dataAcc, [name]: dataList[name]}
        }

        return dataAcc

    }, {}), [selectedExpansions])

    return {getFilteredList}

}
