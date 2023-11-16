import React from "react";

export const brBeautifier = (br = 0, key = '') => {
    return <input className="br" type="text" readOnly value={Math.round(br * 10) / 10} key={key}/>
}