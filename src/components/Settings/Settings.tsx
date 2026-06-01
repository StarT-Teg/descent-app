import uuid from "react-uuid";
import {INITIAL_GAME_PICKS, useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {LOCAL_STORAGE_LANGUAGE_KEY, LOCAL_STORAGE_SAVE_KEY} from "../../shared/global-constants";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React, {useEffect, useState} from "react";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {Button} from "../shared";
import styles from './create-game-party.module.css'
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import Select, {SingleValue} from "react-select";
import {toSelectOption} from "../../helpers";
import {useQuery, UseQueryResult} from "react-query";
import {GameDataInterface, SelectionOptionInterface} from "../../shared";
import {ControlsNameEnum, useGetControlTranslation} from "../../helpers/translationHelpers";

export const Settings = () => {

    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_SAVE_KEY));

    const {language: selectedLanguage} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const {getControlTranslation} = useGetControlTranslation()

    const {mutate: setSave, isLoading: saveIsLoading} = useSetGameSave()
    const gameDataQuery: UseQueryResult<GameDataInterface> = useQuery({queryKey: ['get-data-request'], enabled: false})

    const navigate = useNavigate();

    const languageOptions = gameDataQuery?.data?.translationData?.values?.[0]?.reduce((acc: SelectionOptionInterface[], language: string) => {
        return ([...acc, toSelectOption(language)!])
    }, [])

    const handleCreateUuid = () => {
        const newUuid = uuid();
        localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, newUuid);

        setSave({uuid: newUuid, data: {...INITIAL_GAME_PICKS}}, {
            onSuccess: (response) => {

                const saveGameData = response.data;

                if (typeof saveGameData !== 'string') {
                    dispatchPlayersPick({
                        actionType: GameSaveReducerActionTypeEnum.changeAllPicks,
                        payload: saveGameData,
                    })
                    navigate('/players');
                } else {
                    alert(saveGameData)
                    navigate('/settings');
                }
                navigate('/players')
            }
        })
    }

    const handleSendInviteLink = async () => {
        const url = `${String(window.location.origin)}?inviteUuid=${saveGameUuid}`

        if (navigator?.share) {
            try {
                await navigator.share({url});
            } catch (err) {
                console.error(err)
            }
        }
    }

    const handleExpansionsSettings = () => {
        navigate('/expansions');
    };

    const handleChangeLanguage = (language: SingleValue<SelectionOptionInterface>) => {
        dispatchPlayersPick({
            actionType: GameSaveReducerActionTypeEnum.changeLanguage,
            payload: language?.value
        })
        localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language?.value);
    }

    useEffect(() => {
        setSaveGameUuid(localStorage.getItem(LOCAL_STORAGE_SAVE_KEY))
    }, [])

    return (
        <div className={styles.root}>
            {saveIsLoading ? <LoadingSpinner/> : (
                <>
                    <Button theme='outlineRed' onClick={handleCreateUuid}>
                        {getControlTranslation('Create New Game')}
                    </Button>

                    {!!saveGameUuid && (
                        <Button theme='outlineRed' onClick={handleSendInviteLink}>
                            {getControlTranslation('Copy Invite Link')}
                        </Button>
                    )}

                    <Button theme='outlineRed' onClick={handleExpansionsSettings}>
                        {getControlTranslation(ControlsNameEnum.selectExpansions)}
                    </Button>

                    <Select
                        className='input'
                        value={toSelectOption(selectedLanguage)}
                        options={languageOptions}
                        onChange={handleChangeLanguage}
                        isClearable
                        isSearchable
                        name="select-hero-class"
                        isDisabled={!languageOptions?.length || languageOptions.length <= 1}
                    />

                    {!!saveGameUuid && (
                        <Button theme={'red'} onClick={() => {
                            navigate('/players')
                        }}>{getControlTranslation('Back To Game')}</Button>
                    )}
                </>
            )}
        </div>
    )
}
