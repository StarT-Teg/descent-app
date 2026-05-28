import React, {SVGProps, useState} from 'react';
import {useGameSaveContext, useGameSaveDispatchContext} from '../../context/game-save-context';
import {GameSaveReducerActionTypeEnum} from '../../context/game-save-context-reducer';
import {useSetSaveAndUpdate} from '../../helpers/hooks/useSetSaveAndUpdate';
import {Button} from '../shared';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {
    ALL_EXPANSION_IDS,
    EXPANSION_CATEGORY_LABELS,
    ExpansionCategoryType,
    EXPANSIONS_LIST,
} from '../../shared/expansion-constants';
import styles from './expansions-settings.module.css';
import cn from 'classnames';
import {JSX} from 'react/jsx-runtime';
import {useNavigate} from 'react-router-dom';
import {useGetControlTranslation} from "../../helpers/translationHelpers";

const ArrowBackIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={64}
        height={64}
        viewBox="0 0 26.676 26.676"
        {...props}
    >
        <path
            d="M26.105 21.891a.568.568 0 0 1-.529-.346c-.066-.156-1.716-3.857-7.885-4.59-1.285-.156-2.824-.236-4.693-.25v4.613a.574.574 0 0 1-.304.508.577.577 0 0 1-.588-.033L.254 13.815a.573.573 0 0 1 0-.953l11.857-7.979a.563.563 0 0 1 .588-.029c.19.102.303.295.303.502v4.293c2.578.336 13.674 2.33 13.674 11.674a.574.574 0 0 1-.459.562c-.037.006-.076.006-.112.006z"/>
    </svg>
);

const CATEGORY_ORDER: ExpansionCategoryType[] = ['box', 'campaign', 'lieutenant', 'hero-monster', 'co-op'];

export const ExpansionsSettings = () => {
    const {getControlTranslation} = useGetControlTranslation();
    const {selectedExpansions} = useGameSaveContext();
    const dispatch = useGameSaveDispatchContext();
    const {setSaveAndUpdate, isLoading} = useSetSaveAndUpdate();
    const navigate = useNavigate();

    const [localSelected, setLocalSelected] = useState<string[]>(
        selectedExpansions ?? ALL_EXPANSION_IDS,
    );

    const handleToggle = (id: string) => {
        setLocalSelected((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
        );
    };

    const allSelected = localSelected.length === ALL_EXPANSION_IDS.length;

    const handleToggleAll = () => {
        setLocalSelected(allSelected ? [] : ALL_EXPANSION_IDS);
    };

    const handleSave = () => {
        dispatch({
            actionType: GameSaveReducerActionTypeEnum.changeExpansions,
            payload: localSelected,
        });
        setSaveAndUpdate({selectedExpansions: localSelected});
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className={styles.root}>
            <div className={styles.topBar}>
                <ArrowBackIcon
                    className={styles.backIcon}
                    onClick={() => navigate('/settings')}
                />
                <Button theme="simple" onClick={handleToggleAll}>
                    {allSelected ? 'Deselect all' : 'Select all'}
                </Button>
            </div>

            {CATEGORY_ORDER.map((category) => {
                const items = EXPANSIONS_LIST.filter((e) => e.category === category);
                if (!items.length) return null;

                return (
                    <section key={category} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{EXPANSION_CATEGORY_LABELS[category]}</h2>
                        <div className={styles.grid}>
                            {items.map((expansionItem) => {
                                const isSelected = localSelected.includes(expansionItem.id);
                                return (
                                    <div
                                        key={expansionItem.id}
                                        className={cn(styles.card, {[styles.selected]: isSelected})}
                                        onClick={() => handleToggle(expansionItem.id)}
                                        role="button"
                                        aria-pressed={isSelected}
                                    >
                                        <div className={styles.imageWrapper}>
                                            {expansionItem.image ? (
                                                <img
                                                    src={expansionItem.image}
                                                    alt={expansionItem.name}
                                                    className={styles.image}
                                                />
                                            ) : (
                                                <span className={styles.noImageText}>{expansionItem.name}</span>
                                            )}
                                            {isSelected && <div className={styles.checkmark}>✓</div>}
                                        </div>
                                        {expansionItem.image && (
                                            <span className={styles.name}>{expansionItem.name}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );
            })}

            <div className={styles.footer}>
                <Button theme="outlineRed" onClick={handleSave}>
                    {getControlTranslation('Save')}
                </Button>
            </div>
        </div>
    );
};
