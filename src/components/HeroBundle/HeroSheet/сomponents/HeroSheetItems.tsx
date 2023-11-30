import React from "react";
import plusImage from "../../../../assets/img/plus.png";
import minusImage from "../../../../assets/img/minus.png";


export interface ItemsBundleViewProps {
    itemList: string[],
    heroItems?: string[],
    handleAddItem(itemName: string, itemIndex?: number): void,
    handleRemoveItem(itemIndex?: number): void,
    heroPosition: string,
}

export const HeroSheetItems = (props: ItemsBundleViewProps) => {

    const {
        itemList,
        heroItems,
        handleAddItem,
        handleRemoveItem,
        heroPosition
    } = props;

    return (
        <div className="sub-grid">
            <fieldset>
                <legend>Items</legend>
                {!!heroItems?.length && heroItems.map((item, index) => {
                    return (
                        <div className="list" key={`${heroPosition}-item-view-${index}`}>
                            <input type="image" src={minusImage} alt='remove' name="removeItem"
                                   onClick={() => handleRemoveItem(index)}
                                   style={{width: "15px", height: "15px", alignSelf: "center", paddingRight: "5px"}}/>
                            {/*{brBeautifier(props.allItems[item]?.br, "br" + index)}*/}
                            <input type="text" value={item} list={`${heroPosition}-item-list`}
                                   onChange={(event) => {
                                       console.log('event.target.value: ', event.target.value)
                                       handleAddItem(event.target.value, index)
                                   }}
                                   style={{flexShrink: 2}}
                            />
                        </div>
                    )
                })}

                <input type="image" src={plusImage} alt='add' name={`${heroPosition}-addItem-button`}
                       onClick={() => handleAddItem('')}
                       style={{margin: "5px", width: "50px", height: "50px", alignSelf: "center"}}/>
            </fieldset>

            <datalist id={`${heroPosition}-item-list`}>
                {itemList.sort().map((item, index) => {
                    return <option key={`${heroPosition}-option-item-${index}`} value={item}/>
                })}
            </datalist>
        </div>

    )
}