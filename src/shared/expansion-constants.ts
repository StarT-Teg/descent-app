// Box Expansions
import conversionKitImg from '../assets/img/expansions/conversion-kit.jpg';
import lairOfTheWyrmImg from '../assets/img/expansions/lair-of-the-wyrm.webp';
import labyrinthOfRuinImg from '../assets/img/expansions/labyrinth-of-ruin.png';
import theTrollFensImg from '../assets/img/expansions/the-trollfens.png';
import manorOfRavensImg from '../assets/img/expansions/manor-of-ravens.png';
import mistsOfBilehallImg from '../assets/img/expansions/mists-of-bilehall.png';
import shardsOfEverdarkImg from '../assets/img/expansions/shards-of-everdark.png';
import shadowOfNerekhallImg from '../assets/img/expansions/ShadowOfNerekhall.webp';
// Lieutenant Packs
import elizaFarrowImg from '../assets/img/expansions/eliza-farrow.jpg';
import spligImg from '../assets/img/expansions/splig.jpg';
import zacharethImg from '../assets/img/expansions/zachareth.jpg';
import ariadImg from '../assets/img/expansions/ariad.jpg';
import alricFarrowImg from '../assets/img/expansions/alric-farrow.jpg';
import valyndraImg from '../assets/img/expansions/valyndra.png';
import queenAriadImg from '../assets/img/expansions/queen-ariad.jpg';
import belthirImg from '../assets/img/expansions/belthir.jpg';
import raythenImg from '../assets/img/expansions/raythen.png';
import bolgorethImg from '../assets/img/expansions/bolgoreth.png';
import tristayneOlivenImg from '../assets/img/expansions/tristayne-olliven.png';
import serenaImg from '../assets/img/expansions/serena.png';
import verminousImg from '../assets/img/expansions/verminous.png';
import garganMirklaceImg from '../assets/img/expansions/gargan-mirklace.jpg';
import rylanOlivenImg from '../assets/img/expansions/rylan-olliven.jpg';
import skarnImg from '../assets/img/expansions/skarn.png';
import ardusIxErebusImg from '../assets/img/expansions/ardus-ix-erebus.png';
import kyndrithulImg from '../assets/img/expansions/kyndrithul.png';
import zarihellImg from '../assets/img/expansions/zarihell.png';
// Hero & Monster Collections
import oathOfTheOutcastImg from '../assets/img/expansions/oath-of-the-outcast.png';
import crownOfDestinyImg from '../assets/img/expansions/crown-of-destiny.png';
import guardiansOfDeephallImg from '../assets/img/expansions/guardians-of-deephall.png';
import visionsOfDawnImg from '../assets/img/expansions/visions-of-dawn.png';
import bondsOfTheWildImg from '../assets/img/expansions/bonds-of-the-wild.png';
import treatyOfChampionsImg from '../assets/img/expansions/treaty-of-champions.png';
import stewardsOfTheSecretImg from '../assets/img/expansions/stewards-of-the-secret.png';
// Co-Op Expansions
import forgottenSoulsImg from '../assets/img/expansions/forgotten-souls.png';
import naturesIreImg from '../assets/img/expansions/natures-ire.png';
import darkElementsImg from '../assets/img/expansions/dark-elements.png';

export type ExpansionCategoryType = 'box' | 'lieutenant' | 'hero-monster' | 'co-op' | 'campaign';

export interface ExpansionInterface {
    id: string;
    name: string;
    image: string | null;
    category: ExpansionCategoryType;
}

export const EXPANSIONS_LIST: ExpansionInterface[] = [
    // Box Expansions
    {id: 'conversion-kit', name: 'Conversion Kit', image: conversionKitImg, category: 'box'},
    {id: 'lair-of-the-wyrm', name: 'Lair of the Wyrm', image: lairOfTheWyrmImg, category: 'box'},
    {id: 'labyrinth-of-ruin', name: 'Labyrinth of Ruin', image: labyrinthOfRuinImg, category: 'box'},
    {id: 'the-trollfens', name: 'The Trollfens', image: theTrollFensImg, category: 'box'},
    {id: 'shadow-of-nerekhall', name: 'Shadow of Nerekhall', image: shadowOfNerekhallImg, category: 'box'},
    {id: 'manor-of-ravens', name: 'Manor of Ravens', image: manorOfRavensImg, category: 'box'},
    {id: 'mists-of-bilehall', name: 'Mists of Bilehall', image: mistsOfBilehallImg, category: 'box'},
    {id: 'chains-that-rust', name: 'The Chains that Rust', image: null, category: 'box'},
    {id: 'lost-legends', name: 'Lost Legends', image: null, category: 'box'},
    // Lieutenant Packs
    {id: 'eliza-farrow', name: 'Eliza Farrow', image: elizaFarrowImg, category: 'lieutenant'},
    {id: 'splig', name: 'Splig', image: spligImg, category: 'lieutenant'},
    {id: 'zachareth', name: 'Baron Zachareth', image: zacharethImg, category: 'lieutenant'},
    {id: 'ariad', name: 'Ariad', image: ariadImg, category: 'lieutenant'},
    {id: 'merick-farrow', name: 'Merick Farrow', image: null, category: 'lieutenant'},
    {id: 'alric-farrow', name: 'Sir Alric Farrow', image: alricFarrowImg, category: 'lieutenant'},
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
    {id: 'stewards-of-the-secret', name: 'Stewards of the Secret', image: stewardsOfTheSecretImg, category: 'hero-monster'},
    {id: 'shards-of-everdark', name: 'Shards of Everdark', image: shardsOfEverdarkImg, category: 'hero-monster'},
    // Co-Op Expansions
    {id: 'forgotten-souls', name: 'Forgotten Souls', image: forgottenSoulsImg, category: 'co-op'},
    {id: 'natures-ire', name: "Nature's Ire", image: naturesIreImg, category: 'co-op'},
    {id: 'dark-elements', name: 'Dark Elements', image: darkElementsImg, category: 'co-op'},
    {id: 'road-to-legend', name: 'Road to Legend', image: null, category: 'co-op'},
];

export const ALL_EXPANSION_IDS: string[] = EXPANSIONS_LIST.map((e) => e.id);

export const EXPANSION_CATEGORY_LABELS: Record<ExpansionCategoryType, string> = {
    'box': 'Box Expansions',
    'lieutenant': 'Lieutenant Packs',
    'hero-monster': 'Hero & Monster Collections',
    'co-op': 'Co-Op Expansions',
    'campaign': 'Campaign Books',
};
