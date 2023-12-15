import React from "react";
import {HeroPlayerPicks, SelectionOptionInterface} from "../../../types/shared";
import {MultiSelect} from "../../OverlordBench/components/shared/MultiSelect/MultiSelect";
import {toSelectOption} from "../../../helpers";


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

    const onItemSelect = (items: SelectionOptionInterface[]) => {
        const newItemsList = items.map(itemData => (itemData.value));

        handleChangeHeroItems({heroItems: newItemsList})
    }

    return (
        <div className="sub-grid">
            <fieldset>
                <legend>Items</legend>

                <MultiSelect options={itemOptions} selectedOptions={selectedItems} onItemsChange={onItemSelect}/>

                {heroItems?.map((itemName: string, index) => {
                        return (
                            <input type="text" readOnly value={itemName} className={'input'}
                                   key={`${heroPosition}-item-${itemName}-${index}`}/>
                        )
                    }
                )}
            </fieldset>
        </div>

    )
}