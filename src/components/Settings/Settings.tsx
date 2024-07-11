import uuid from "react-uuid";
import {INITIAL_GAME_PICKS, useGameSaveContext, useGameSaveDispatchContext} from "../../context/game-save-context";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React, {useEffect, useState} from "react";
import {useSetGameSave} from "../../dataHooks/useSetGameSave";
import {Button} from "../shared";
import styles from './create-game-party.module.css'
import {GameSaveReducerActionTypeEnum} from "../../context/game-save-context-reducer";
import Select from "react-select";
import {toSelectOption} from "../../helpers";
import {useQuery, UseQueryResult} from "react-query";
import {ExcelDataRaw, SelectionOptionInterface} from "../../shared";
import {useGetControlTranslation} from "../../helpers/translationHelpers";

export const Settings = () => {

    const localStorageSaveKey = 'descent-save-game-uuid';
    const [saveGameUuid, setSaveGameUuid] = useState<string | null>(localStorage.getItem(localStorageSaveKey));

    const {language} = useGameSaveContext();
    const dispatchPlayersPick = useGameSaveDispatchContext();

    const {getControlTranslation} = useGetControlTranslation()

    const {mutate: setSave, isLoading: saveIsLoading} = useSetGameSave()
    const translationQuery: UseQueryResult<ExcelDataRaw> = useQuery({queryKey: ['get-translation-request']})

    const navigate = useNavigate();

    const languageOptions = translationQuery?.data?.values?.[0]?.reduce((acc: SelectionOptionInterface[], language: string) => {
        return ([...acc, toSelectOption(language)!])
    }, [])

    const handleCreateUuid = () => {
        const newUuid = uuid();
        localStorage.setItem(localStorageSaveKey, newUuid);

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
        const url = `${process.env.REACT_APP_BASE_PATH}?inviteUuid=${saveGameUuid}`

        if (navigator?.share) {
            try {
                await navigator.share({url});
            } catch (err) {
                console.log(err)
            }
        }
    }
    //     () => {
    //     const url = `${process.env.REACT_APP_BASE_PATH}?inviteUuid=${saveGameUuid}`
    //
    //     try {
    //         // navigator.share({url}).then()
    //         navigator.clipboard.writeText(url).then()
    //     } catch (e) {
    //         console.log('error:', e)
    //     }
    // }

    // const handleExpansionsSettings = () => {
    //     navigate('/expansions')
    // }

    useEffect(() => {
        setSaveGameUuid(localStorage.getItem(localStorageSaveKey))
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

                    {/*<Button theme='outlineRed' onClick={handleExpansionsSettings}>*/}
                    {/*    Select expansions*/}
                    {/*</Button>*/}

                    <Select
                        className='input'
                        value={toSelectOption(language)}
                        options={languageOptions}
                        onChange={(value) => {
                            dispatchPlayersPick({
                                actionType: GameSaveReducerActionTypeEnum.changeLanguage,
                                payload: value?.value
                            })
                        }}
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