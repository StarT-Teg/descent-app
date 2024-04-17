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
import {useGameSaveDispatchContext} from "../../../../context/game-save-context";
import {useHeroesDataContext} from "../../../../context";


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

    const itemOptions: SelectionOptionInterface[] = itemList.map(itemName => (toSelectOption(itemName)!));
    const selectedItems = heroItems?.map(itemName => (toSelectOption(itemName)!));

    const uuid = localStorage.getItem('descent-save-game-uuid')!;
    const {mutate, isLoading} = useSetGameSave()
    const dispatch = useGameSaveDispatchContext();

    const {items} = useHeroesDataContext()
    const {getItemBr} = useBrFunctions();

    const onItemSelect = (items: SelectionOptionInterface[]) => {
        const newItemsList = items.map(itemData => (itemData.value));

        handleChangeHeroItems({heroItems: newItemsList})
    }

    const onBuyOrSellButtonClick = (gold: number) => {
        console.log('gold:', gold)
        mutate({uuid: uuid, data: {gold}}, {
            onSuccess: (response) => {
                dispatch({
                    payload: response.data?.gold,
                    actionType: GameSaveReducerActionTypeEnum.changeGold
                })
            }
        })
    }

    return (
        <div className="sub-grid">
            <fieldset>
                <legend>Items</legend>

                <MultiSelect options={itemOptions} selectedOptions={selectedItems} onItemsChange={onItemSelect}/>

                {heroItems?.map((itemName: string, index) => {
                    const itemBr = getItemBr(itemName);
                    const itemCost = Number(items[itemName].shoppingAct) * shoppingActMultiplier;
                    const itemCostForSale = Math.ceil(itemCost / 2 / 5) * 5

                    return (
                        <ModalPortal modalComponent={
                            (onClose) => (
                                <div>
                                    <Button onClick={() => {
                                        onBuyOrSellButtonClick(-itemCost)
                                    }} theme={'simple'}>Buy</Button>
                                    <Button onClick={() => {
                                        onBuyOrSellButtonClick(itemCostForSale)
                                    }} theme={'simple'}>Sell</Button>
                                    <Button onClick={onClose} theme={'simple'}>Quit</Button>
                                </div>
                            )
                        } openModalButtonComponent={
                            (onOpen) => (
                                <div className={styles.itemLine}>
                                    <input type="text" readOnly value={itemName} className={'input'}
                                           key={`${heroPosition}-item-${itemName}-${index}`}
                                           onClick={onOpen}
                                    />
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