import React from "react";
import plusImage from "../../../assets/img/plus.png";
import minusImage from "../../../assets/img/minus.png";

export const ItemsBundleView = (props) => {

    const {
        heroItems,
        handlerAddItem,
        handlerRemoveItem,
        heroPosition
    } = props;

    return (
        <div className="sub-grid">
            <fieldset>
                <legend>Items</legend>
                {heroItems.map((item, index) => {
                    return (
                        <div className="list" key={`${heroPosition}-item-${index}`}>
                            <input type="image" src={minusImage} alt='remove' name="removeItem"
                                   onClick={() => handlerRemoveItem(item)}
                                   style={{width: "15px", height: "15px", alignSelf: "center", paddingRight: "5px"}}/>
                            {/*{brBeautifier(props.allItems[item]?.br, "br" + index)}*/}
                            <input type="text" value={item} list={`${heroPosition}-item-list`}
                                   onChange={(event) => handlerAddItem(event.target.value, index)}
                                   key={`${heroPosition}-item-list`}
                                   style={{flexShrink: 2}}
                            />
                        </div>
                    )
                })}

                <input type="image" src={plusImage} alt='add' name={`${heroPosition}-addItem-button`}
                       onClick={() => handlerAddItem()}
                       style={{margin: "5px", width: "50px", height: "50px", alignSelf: "center"}}/>
            </fieldset>

            <datalist id={`${heroPosition}-item-list`}>
                {Object.keys(props.allItems).sort().map((item, index) => {
                    return <option key={`${heroPosition}-item-${index}`} value={item}/>
                })}
            </datalist>
        </div>

    )
}