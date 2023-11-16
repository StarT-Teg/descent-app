import React, {useState} from 'react';
import SingleHeroSheet from "./SingleHeroSheet/SingleHeroSheet";

export default function HeroBundle(props) {

    const {
        heroesInfo,
        classesInfo,
        itemsInfo,
    } = props;

    const [allHeroesBR, setAllHeroesBR] = useState({})

    const handleChangeBR = (heroPosition, amount) => {
        setAllHeroesBR(prevAmount => {
            return {
                ...prevAmount,
                heroPosition: amount,
            }
        })
    }

    let allHeroesBRSum = 0;

    for (const classesInfoKey in classesInfo) {

        allHeroesBRSum += allHeroesBR?.[classesInfoKey]?.br || 0

    }

    return (
        <div>
            <SingleHeroSheet changeHeroBR={handleChangeBR} heroPosition='firstHero' heroesInfo={heroesInfo}
                             classesInfo={classesInfo} itemsInfo={itemsInfo}/>
            <SingleHeroSheet changeHeroBR={handleChangeBR} heroPosition='secondHero' heroesInfo={heroesInfo}
                             classesInfo={classesInfo} itemsInfo={itemsInfo}/>
            <div>{allHeroesBRSum}</div>
        </div>
    )

}
