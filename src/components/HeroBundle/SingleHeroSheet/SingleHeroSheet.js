import React, {useEffect, useState} from "react";
import {HeroBundleView} from "../heroSheetViewComponents/HeroBundleView";
import {ItemsBundleView} from "../heroSheetViewComponents/ItemsBundleView";
import {ClassesBundleView} from "../heroSheetViewComponents/ClassesBundleView";
import {SkillsBundleView} from "../heroSheetViewComponents/SkillsBundleView";

export default function SingleHeroSheet(props) {

    const {
        heroNames = props.heroesInfo?.heroNames || [],
        heroesInfo,
        classesInfo,
        itemsInfo = {},
        heroPosition,
        changeHeroBR,
    } = props

    const [heroName, setHeroName] = useState('');
    const [heroClassName, setHeroClassName] = useState('');
    const [heroSubclassName, setHeroSubclassName] = useState('');
    const [heroAvailableClasses, setHeroAvailableClasses] = useState([]);
    const [heroAvailableSubclasses, setHeroAvailableSubclasses] = useState([]);
    const [heroAvailableSkills, setHeroAvailableSkills] = useState({});
    const [heroItems, setHeroItems] = useState([]);

    const [classListDisabled, setClassListDisabled] = useState(true);
    const [subclassListHidden, setSubclassListHidden] = useState(true);

    useEffect(() => {

        const heroBR = heroesInfo?.[heroName]?.br || 0
        let classBR = 0;
        let itemsBR = 0

        Object.keys(heroAvailableSkills).forEach(skillName => {
            classBR += heroAvailableSkills[skillName].checked ? heroAvailableSkills[skillName].br : 0;
        })

        heroItems.forEach(itemName => {
            itemsBR += itemsInfo[itemName]?.br || 0;
        })

        changeHeroBR(heroPosition, heroBR + classBR + itemsBR)
    })
    useEffect(() => {

        const heroAvailableClasses = [];

        if (heroesInfo[heroName]) {

            setHeroName(heroName)

            for (const key in classesInfo) {
                if (classesInfo[key].archetype === heroesInfo[heroName].type) {
                    heroAvailableClasses.push(key);
                }
            }

            setClassListDisabled(false);
        }

        setHeroAvailableClasses(heroAvailableClasses);

    }, [heroName])
    useEffect(() => {

        let heroAvailableSubclasses = [];
        let heroAvailableSkills = {};

        if (classesInfo[heroClassName]) {

            heroAvailableSkills = classesInfo[heroClassName].skills

            Object.keys(heroAvailableSkills).forEach(skill => {
                heroAvailableSkills[skill]['xp cost'] === 0 ? heroAvailableSkills[skill].checked = true : heroAvailableSkills[skill].checked = false;
            })

            let subArchetype;

            switch (heroClassName) {
                case "Battlemage":
                case "Ravager":
                case "Crusader":
                    subArchetype = "Warrior";
                    break;
                case "Steelcaster":
                case "Trickster":
                case "Heretic":
                    subArchetype = "Mage";
                    break;
                case "Truthseer":
                case "Raider":
                case "Watchman":
                    subArchetype = "Scout";
                    break;
                case "Lorekeeper":
                case "Avenger":
                case "Monk":
                    subArchetype = "Healer";
                    break;
            }

            if (subArchetype) {
                for (const heroClass in classesInfo) {

                    if (classesInfo[heroClass].archetype === subArchetype) {
                        heroAvailableSubclasses.push(heroClass)
                    }
                }

            }

            heroAvailableSubclasses.length > 0 && setSubclassListHidden(false)

        } else {
            setHeroClassName('');
        }

        setHeroAvailableSkills(heroAvailableSkills)
        setHeroAvailableSubclasses(heroAvailableSubclasses)
    }, [heroClassName])
    useEffect(() => {

        let heroAvailableSubclassSkills = {};

        if (classesInfo[heroSubclassName]) {

            const newHeroStateSubclass = classesInfo[heroSubclassName];

            for (const skill in classesInfo[heroSubclassName].skills) {

                if (newHeroStateSubclass.skills[skill]['xp cost'] === 3) {
                    delete newHeroStateSubclass.skills[skill];
                }
                if (newHeroStateSubclass.skills[skill]) {
                    newHeroStateSubclass.skills[skill].checked = newHeroStateSubclass.skills[skill]['xp cost'] === 0;
                }
            }
            heroAvailableSubclassSkills = {...newHeroStateSubclass.skills}
        } else {
            setHeroSubclassName('');
        }

        setHeroAvailableSkills(prevSkills => {
            return {...prevSkills, ...heroAvailableSubclassSkills}
        })

    }, [heroSubclassName])

    const handleAddHeroItem = (item = '', index = -1) => {

        let newItemList = [...heroItems];

        index < 0 ? newItemList.push(item) : newItemList[index] = item;

        setHeroItems(newItemList);
    }
    const handlerRemoveItem = (item) => {

        let indexOfItem = heroItems.indexOf(item);
        let newItems = [...heroItems];
        newItems.splice(indexOfItem, 1);

        setHeroItems(newItems)

    }
    const handleSkillChecked = (skillName) => {

        const skillState = classesInfo[skillName]?.checked;

        setHeroAvailableSkills(prevState => {
            return {
                ...prevState,
                [skillName]: {
                    ...prevState[skillName],
                    checked: !skillState
                },
            }
        })
    }

    console.log('heroesInfo: ', heroesInfo)

    return (

        <div className='hero-container'>
            <div className='grid-container'>

                <div className="sub-grid">

                    <HeroBundleView
                        heroNames={heroNames}
                        handleChangeHeroName={setHeroName}
                        type={heroesInfo[heroName]?.type}
                        heroPosition={heroPosition}
                    />

                    <ItemsBundleView
                        allItems={itemsInfo}
                        heroItems={heroItems}
                        handlerAddItem={handleAddHeroItem}
                        handlerRemoveItem={handlerRemoveItem}
                        heroPosition={heroPosition}
                    />

                </div>

                <div className="sub-grid">

                    <ClassesBundleView
                        classList={heroAvailableClasses}
                        subclassList={heroAvailableSubclasses}
                        handleChangeClassName={setHeroClassName}
                        handleChangeSubclassName={setHeroSubclassName}
                        className={heroClassName}
                        subclassName={heroSubclassName}
                        classVisibility={classListDisabled}
                        subclassVisibility={!subclassListHidden}
                        heroPosition={heroPosition}
                    />

                    <SkillsBundleView
                        skills={heroAvailableSkills}
                        heroPosition={heroPosition}
                        onCheckboxChange={handleSkillChecked}
                    />

                </div>
            </div>
        </div>


    )
}