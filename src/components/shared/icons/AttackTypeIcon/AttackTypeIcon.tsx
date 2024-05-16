import React from "react";

interface AttackTypeIconPropsInterface {
    type: 'melee' | 'ranged' | string;
    size?: number;
}

export const AttackTypeIcon = ({type, size = 35}: AttackTypeIconPropsInterface) => (
    <img src={require(`../../../../assets/img/attackType/${type.toLowerCase()}.png`)}
         style={{width: `${size}px`, height: `${size}px`}} alt=""/>
)