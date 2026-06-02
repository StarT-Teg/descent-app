// Box Expansions
import lairOfTheWyrmImg from '../assets/img/expansions/lair-of-the-wyrm.webp';
import labyrinthOfRuinImg from '../assets/img/expansions/labyrinth-of-ruin.webp';
import theTrollFensImg from '../assets/img/expansions/the-trollfens.webp';
import manorOfRavensImg from '../assets/img/expansions/manor-of-ravens.webp';
import mistsOfBilehallImg from '../assets/img/expansions/mists-of-bilehall.webp';
import shardsOfEverdarkImg from '../assets/img/expansions/shards-of-everdark.webp';
import shadowOfNerekhallImg from '../assets/img/expansions/ShadowOfNerekhall.webp';
// Lieutenant Packs
import elizaFarrowImg from '../assets/img/expansions/eliza-farrow.webp';
import spligImg from '../assets/img/expansions/splig.webp';
import zacharethImg from '../assets/img/expansions/zachareth.webp';
import ariadImg from '../assets/img/expansions/ariad.webp';
import valyndraImg from '../assets/img/expansions/valyndra.webp';
import queenAriadImg from '../assets/img/expansions/queen-ariad.webp';
import belthirImg from '../assets/img/expansions/belthir.webp';
import raythenImg from '../assets/img/expansions/raythen.webp';
import bolgorethImg from '../assets/img/expansions/bolgoreth.webp';
import tristayneOlivenImg from '../assets/img/expansions/tristayne-olliven.webp';
import serenaImg from '../assets/img/expansions/serena.webp';
import verminousImg from '../assets/img/expansions/verminous.webp';
import garganMirklaceImg from '../assets/img/expansions/gargan-mirklace.webp';
import rylanOlivenImg from '../assets/img/expansions/rylan-olliven.webp';
import skarnImg from '../assets/img/expansions/skarn.webp';
import ardusIxErebusImg from '../assets/img/expansions/ardus-ix-erebus.webp';
import kyndrithulImg from '../assets/img/expansions/kyndrithul.webp';
import zarihellImg from '../assets/img/expansions/zarihell.webp';
import chainsThatRust from '../assets/img/expansions/chains-that-rust.webp';
import lostLegends from '../assets/img/expansions/lost-legends.webp';
// Hero & Monster Collections
import oathOfTheOutcastImg from '../assets/img/expansions/oath-of-the-outcast.webp';
import crownOfDestinyImg from '../assets/img/expansions/crown-of-destiny.webp';
import guardiansOfDeephallImg from '../assets/img/expansions/guardians-of-deephall.webp';
import visionsOfDawnImg from '../assets/img/expansions/visions-of-dawn.webp';
import bondsOfTheWildImg from '../assets/img/expansions/bonds-of-the-wild.webp';
import treatyOfChampionsImg from '../assets/img/expansions/treaty-of-champions.webp';
import stewardsOfTheSecretImg from '../assets/img/expansions/stewards-of-the-secret.webp';
// Co-Op Expansions
import forgottenSoulsImg from '../assets/img/expansions/forgotten-souls.webp';
import naturesIreImg from '../assets/img/expansions/natures-ire.webp';
import darkElementsImg from '../assets/img/expansions/dark-elements.webp';

export type ExpansionCategoryType = 'box' | 'lieutenant' | 'hero-monster' | 'co-op' | 'campaign';

export interface ExpansionInterface {
    id: string;
    name: string;
    image: string | null;
    category: ExpansionCategoryType;
}

export const EXPANSIONS_LIST: ExpansionInterface[] = [
    // Box Expansions
    // {id: 'conversion-kit', name: 'Conversion Kit', image: conversionKitImg, category: 'box'},
    {id: 'lair-of-the-wyrm', name: 'Lair of the Wyrm', image: lairOfTheWyrmImg, category: 'box'},
    {id: 'labyrinth-of-ruin', name: 'Labyrinth of Ruin', image: labyrinthOfRuinImg, category: 'box'},
    {id: 'the-trollfens', name: 'The Trollfens', image: theTrollFensImg, category: 'box'},
    {id: 'shadow-of-nerekhall', name: 'Shadow of Nerekhall', image: shadowOfNerekhallImg, category: 'box'},
    {id: 'manor-of-ravens', name: 'Manor of Ravens', image: manorOfRavensImg, category: 'box'},
    {id: 'mists-of-bilehall', name: 'Mists of Bilehall', image: mistsOfBilehallImg, category: 'box'},
    {id: 'chains-that-rust', name: 'The Chains that Rust', image: chainsThatRust, category: 'box'},
    {id: 'lost-legends', name: 'Lost Legends', image: lostLegends, category: 'box'},
    // Lieutenant Packs
    {id: 'eliza-farrow', name: 'Eliza Farrow', image: elizaFarrowImg, category: 'lieutenant'},
    {id: 'splig', name: 'Splig', image: spligImg, category: 'lieutenant'},
    {id: 'zachareth', name: 'Baron Zachareth', image: zacharethImg, category: 'lieutenant'},
    {id: 'ariad', name: 'Ariad', image: ariadImg, category: 'lieutenant'},
    {id: 'merick-farrow', name: 'Merick Farrow', image: null, category: 'lieutenant'},
    {id: 'alric-farrow', name: 'Sir Alric Farrow', image: null, category: 'lieutenant'},
    {id: 'valyndra', name: 'Valyndra', image: valyndraImg, category: 'lieutenant'},
    {id: 'queen-ariad', name: 'Queen Ariad', image: queenAriadImg, category: 'lieutenant'},
    {id: 'belthir', name: 'Belthir', image: belthirImg, category: 'lieutenant'},
    {id: 'raythen', name: 'Raythen', image: raythenImg, category: 'lieutenant'},
    {id: 'bolgoreth', name: "Bol'Goreth", image: bolgorethImg, category: 'lieutenant'},
    {id: 'tristayne-olliven', name: 'Tristayne Olliven', image: tristayneOlivenImg, category: 'lieutenant'},
    {id: 'serena', name: 'Serena', image: serenaImg, category: 'lieutenant'},
    {id: 'verminous', name: 'Verminous', image: verminousImg, category: 'lieutenant'},
    {id: 'gargan-mirklace', name: 'Gargan Mirklace', image: garganMirklaceImg, category: 'lieutenant'},
    {id: 'rylan-olliven', name: 'Rylan Olliven', image: rylanOlivenImg, category: 'lieutenant'},
    {id: 'ardus-ix-erebus', name: "Ardus Ix'Erebus", image: ardusIxErebusImg, category: 'lieutenant'},
    {id: 'kyndrithul', name: 'Kyndrithul', image: kyndrithulImg, category: 'lieutenant'},
    {id: 'zarihell', name: 'Zarihell', image: zarihellImg, category: 'lieutenant'},
    {id: 'skarn', name: 'Skarn', image: skarnImg, category: 'lieutenant'},
    // Hero & Monster Collections
    {id: 'oath-of-the-outcast', name: 'Oath of the Outcast', image: oathOfTheOutcastImg, category: 'hero-monster'},
    {id: 'crown-of-destiny', name: 'Crown of Destiny', image: crownOfDestinyImg, category: 'hero-monster'},
    {id: 'crusade-of-the-forgotten', name: 'Crusade of the Forgotten', image: null, category: 'hero-monster'},
    {id: 'guardians-of-deephall', name: 'Guardians of Deephall', image: guardiansOfDeephallImg, category: 'hero-monster'},
    {id: 'visions-of-dawn', name: 'Visions of Dawn', image: visionsOfDawnImg, category: 'hero-monster'},
    {id: 'bonds-of-the-wild', name: 'Bonds of the Wild', image: bondsOfTheWildImg, category: 'hero-monster'},
    {id: 'treaty-of-champions', name: 'Treaty of Champions', image: treatyOfChampionsImg, category: 'hero-monster'},
    {
        id: 'stewards-of-the-secret',
        name: 'Stewards of the Secret',
        image: stewardsOfTheSecretImg,
        category: 'hero-monster'
    },
    {id: 'shards-of-everdark', name: 'Shards of Everdark', image: shardsOfEverdarkImg, category: 'hero-monster'},
    // Co-Op Expansions
    {id: 'forgotten-souls', name: 'Forgotten Souls', image: forgottenSoulsImg, category: 'co-op'},
    {id: 'natures-ire', name: "Nature's Ire", image: naturesIreImg, category: 'co-op'},
    {id: 'dark-elements', name: 'Dark Elements', image: darkElementsImg, category: 'co-op'},
];

export const ALL_EXPANSION_NAMES: string[] = EXPANSIONS_LIST.map((e) => e.name);

/** Convert array of ids → array of names */
export const expansionIdsToNames = (ids: string[]): string[] =>
    ids.reduce<string[]>((acc, id) => {
        const found = EXPANSIONS_LIST.find((e) => e.id === id);
        return found ? [...acc, found.name] : acc;
    }, []);

/** Convert array of names → array of ids */
export const expansionNamesToIds = (names: string[]): string[] =>
    names.reduce<string[]>((acc, name) => {
        const found = EXPANSIONS_LIST.find((e) => e.name === name);
        return found ? [...acc, found.id] : acc;
    }, []);

export const EXPANSION_CATEGORY_LABELS: Record<ExpansionCategoryType, string> = {
    'box': 'Box Expansions',
    'lieutenant': 'Lieutenant Packs',
    'hero-monster': 'Hero & Monster Collections',
    'co-op': 'Co-Op Expansions',
    'campaign': 'Campaign Books',
};
