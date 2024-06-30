import React from "react";
import {HeroPlayerPicks, SelectionOptionInterface, shoppingActMultiplier} from "../../../../shared";
import {MultiSelect} from "../../../OverlordBench/components/shared/MultiSelect/MultiSelect";
import {toSelectOption} from "../../../../helpers";
import {useBrFunctions} from "../../../../helpers/hooks/useBrFunctions";
import {ModalPortal} from "../../../Modal/ModalPortal";
import styles from './hero-sheet-items.module.css'
import {Button} from "../../../shared";
import {GameSaveReducerActionTypeEnum} from "../../../../context/game-save-context-reducer";
import {useSetGameSave} from "../../../../dataHooks/useSetGameSave";
import {useGameSaveContext, useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {useHeroesDataContext} from "../../../../context";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import {SuggestTranslationButton} from "../../../SuggestTranslationButton/SuggestTranslationButton";
import {useGetControlTranslation} from "../../../../helpers/translationHelpers";


export interface ItemsBundleViewProps {
    itemList: string[],
    heroItems?: string[],

    handleChangeHeroItems(newItems: Partial<HeroPlayerPicks>): void;

    heroPosition: string,
}

export const HeroSheetItems = (props: ItemsBundleViewProps) => {

    const {
        itemList,
        heroItems,
        handleChangeHeroItems,
        heroPosition
    } = props;

    const {items} = useHeroesDataContext();
    const {language} = useGameSaveContext()

    const {getControlTranslation} = useGetControlTranslation()

    const getTranslation = (cardName: string, translationName: 'name') => {
        return !!language ? items[cardName]?.translations?.[translationName]?.[language] || cardName : cardName;
    }

    const itemOptions: SelectionOptionInterface[] = itemList.map(itemName => (toSelectOption(itemName, getTranslation(itemName, 'name'))!));
    const selectedItems = heroItems?.map(itemName => (toSelectOption(itemName, getTranslation(itemName, 'name'))!));

    const uuid = localStorage.getItem('descent-save-game-uuid')!;
    const {mutate, isLoading} = useSetGameSave()
    const dispatch = useGameSaveDispatchContext();

    const {getItemBr} = useBrFunctions();

    const onItemSelect = (items: SelectionOptionInterface[]) => {
        const newItemsList = items.map(itemData => (itemData.value));

        handleChangeHeroItems({heroItems: newItemsList})
    }

    const onBuyOrSellButtonClick = (gold: number, onSuccess?: () => void) => {
        mutate({uuid: uuid, data: {gold}}, {
            onSuccess: (response) => {
                dispatch({
                    payload: response.data?.gold,
                    actionType: GameSaveReducerActionTypeEnum.changeGold
                })
                onSuccess?.();
            }
        })
    }

    return (
        <div className="sub-grid">
            <fieldset>
                <legend>{getControlTranslation('Items')}</legend>

                <MultiSelect options={itemOptions} selectedOptions={selectedItems} onItemsChange={onItemSelect}/>

                {heroItems?.map((itemName: string, index) => {
                        const itemBr = getItemBr(itemName);
                        const itemCost = Number(items[itemName]?.shoppingAct) * shoppingActMultiplier;
                        const itemCostForSale = Math.ceil(itemCost / 2 / 5) * 5

                        return (
                            <ModalPortal isAutoCloseDisabled key={`${heroPosition}-items-${itemName}-${index}`}
                                         modalComponent={
                                             (onClose) => (
                                                 isLoading ? <LoadingSpinner/> : (<div className={styles.buttonColumn}>
                                                     <Button onClick={() => {
                                                         onBuyOrSellButtonClick(-itemCost);
                                                     }} theme={'simple'}>Buy</Button>
                                                     <Button onClick={() => {
                                                         onBuyOrSellButtonClick(itemCostForSale, () => {
                                                             onItemSelect(selectedItems?.filter(item => item.value !== itemName) || []);
                                                             onClose();
                                                         });
                                                     }} theme={'simple'}>Sell</Button>
                                                     <Button onClick={onClose} theme={'simple'}>Quit</Button>
                                                 </div>)
                                             )
                                         } openModalButtonComponent={
                                (onOpen) => (
                                    <div className={styles.itemLine}>
                                        <input type="text" readOnly
                                               value={getTranslation(itemName, 'name')}
                                               className={'input'}
                                               key={`${heroPosition}-item-${itemName}-${index}`}
                                               onClick={onOpen}
                                        />
                                        <SuggestTranslationButton stringToTranslate={itemName} />
                                        <div className={styles.br}>
                                            BR: {itemBr}
                                        </div>
                                    </div>
                                )
                            }/>
                        )
                    }
                )}
            </fieldset>
        </div>

    )
}