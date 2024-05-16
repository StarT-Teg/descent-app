import React from "react";

interface DiceIconPropsInterface {
    type: "Black" | "Blue" | "Brown" | "Green" | "Grey" | "Red" | "Yellow" | string;
    size?: number;
}

export const DiceIcon = ({type, size = 35}: DiceIconPropsInterface) => (
    <img src={require(`../../../../assets/img/dice/${type.toLowerCase()}.png`)}
         style={{width: `${size}px`, height: `${size}px`}} alt=""/>
)