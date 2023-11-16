import React, {useEffect, useState} from "react";
import useGoogleSheets from 'use-google-sheets';
import {useGetHeroesData} from "./dataHooks/useGetHeroesData";
import {useGetItemsData} from "./dataHooks/useGetItemsData";
import {useGetMonstersData} from "./dataHooks/useGetMonstersData";

export const App = () => {

    const [state, setState] = useState<any>();

    const {data} = useGetMonstersData();

    useEffect(() => {
        if (!!data) {
            setState(data)
        }
    }, [data])

    console.log(state)

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         heroesInfo: {},
    //         classesInfo: {},
    //         itemsInfo: {},
    //     }
    // }

    // componentDidMount() {
    //
    //     // store.subscribe(() => this.forceUpdate())
    //
    //     axios.get(`http://localhost:3001/heroesInfo`)
    //         .then(res => {
    //             const response = [...res.data];
    //
    //             let heroesInfo = {
    //                 heroNames: [],
    //             }
    //
    //             for (let i = 1; i < response.length; i++) {
    //
    //                 heroesInfo.heroNames.push(response[i][0]);
    //
    //                 const heroName = response[i][0];
    //                 const hero = {};
    //
    //                 for (var y = 0; y < response[0].length; y++) {
    //                     const title = response[0][y].toLowerCase();
    //                     const value = response[i][y];
    //
    //                     hero[title] = value;
    //                 }
    //
    //                 heroesInfo[heroName] = hero;
    //             }
    //
    //
    //             heroesInfo.heroNames.sort();
    //
    //             this.setState(prevState => ({...prevState, heroesInfo: heroesInfo}));
    //
    //         });
    //
    //     axios.get(`http://localhost:3001/heroClasses`)
    //         .then(res => {
    //             const response = [...res.data];
    //             let classesInfo = {
    //                 // classNames: [],
    //             };
    //
    //             for (let i = 1; i < response.length; i++) {
    //
    //                 const archetype = response[i][0];
    //                 const className = response[i][1];
    //                 const skillName = response[i][2]
    //
    //                 //console.log('archetype: ', archetype, 'className: ', className, 'skillName: ', skillName)
    //
    //                 //classesInfo.classNames.push(className);
    //                 if (!classesInfo[className]) {
    //                     classesInfo[className] = {'className': className, 'archetype': archetype, skills: {}}
    //                 }
    //
    //                 for (let y = 3; y < response[0].length; y++) {
    //
    //                     const title = response[0][y].toLowerCase();
    //                     const value = response[i][y];
    //
    //                     if (!classesInfo[className].skills[skillName]) {
    //                         classesInfo[className].skills = {
    //                             ...classesInfo[className].skills,
    //                             [skillName]: {name: skillName}
    //                         }
    //                     }
    //
    //                     classesInfo[className].skills[skillName][title] = value;
    //
    //                 }
    //             }
    //
    //             // const classesInfoSorted = []
    //             //
    //             // for (key in classesInfo) {
    //             //     classesInfoSorted.push({
    //             //         [key]: classesInfo[key],
    //             //     })
    //             // }
    //
    //             const classesInfoSorted = {
    //                 ...classesInfo,
    //                 classNames: [...new Set(classesInfo.classNames)],
    //             };
    //
    //             this.setState(prevState => ({...prevState, classesInfo: {...classesInfoSorted}}));
    //
    //         })
    //
    //     axios.get(`http://localhost:3001/items`)
    //         .then(res => {
    //             const response = [...res.data];
    //
    //             let itemsInfo = {};
    //
    //             for (let i = 1; i < response.length; i++) {
    //
    //                 const act = response[i][0];
    //                 const shoppingAct = response[i][1];
    //                 const itemName = response[i][2];
    //                 const cost = response[i][3];
    //                 const equip = response[i][4];
    //                 const attackType = response[i][5];
    //                 const dice = response[i][6];
    //                 const tags = response[i][8];
    //                 const properties = response[i][9];
    //                 const traits = response[i][11];
    //                 const surgeAbilities = [response[i][13], response[i][15], response[i][17]].filter(value => value).join(", ");
    //                 const br = response[i][22];
    //
    //                 const item = {
    //                     act: act,
    //                     shoppingAct: shoppingAct,
    //                     itemName: itemName,
    //                     cost: cost,
    //                     equip: equip,
    //                     attackType: attackType,
    //                     dice: dice,
    //                     tags: tags,
    //                     properties: properties,
    //                     traits: traits,
    //                     surgeAbilities: surgeAbilities,
    //                     br: br
    //                 }
    //
    //                 //console.log('archetype: ', archetype, 'className: ', className, 'skillName: ', skillName)
    //
    //                 itemsInfo = {
    //                     ...itemsInfo,
    //                     [itemName]: item,
    //                 }
    //             }
    //
    //             this.setState(prevState => ({...prevState, itemsInfo: itemsInfo,}));
    //
    //         });
    //
    // }

    return (
        <>
            {/*<HeroBundle heroesInfo={this.state.heroesInfo} classesInfo={this.state.classesInfo} itemsInfo={this.state.itemsInfo}/>*/}
            <div/>
        </>
    )


}