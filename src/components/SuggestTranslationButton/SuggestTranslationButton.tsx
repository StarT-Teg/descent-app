import {ModalPortal} from "../Modal/ModalPortal";
import React, {useState} from "react";
import {Button} from "../shared";
import classNames from "classnames";
import styles from "../OverlordBench/components/CampaignSetup/campaign-setup.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {useGameSaveContext} from "../../context/game-save-context";
import {useSetTranslation} from "../../dataHooks/useSetTranslation";
import {useQueryClient} from "react-query";


export const SuggestTranslationButton = ({
                                             stringToTranslate,
                                             disabled
                                         }: { stringToTranslate?: string, disabled?: boolean }) => {

    const {language} = useGameSaveContext()
    const {mutate, isLoading} = useSetTranslation();

    const queryClient = useQueryClient()

    const [suggestedTranslation, setSuggestedTranslation] = useState<string>('');

    const setTranslation = (callback?: () => void) => {
        if (!!language && !!suggestedTranslation && !!stringToTranslate) {
            mutate({stringToTranslate, translation: suggestedTranslation, language}, {
                onSuccess: () => {
                    callback?.()
                    queryClient.invalidateQueries({queryKey: ['get-translation-request']}).then();
                }
            });
        }
    }

    if (language === 'en') {
        return null
    }

    return (
        <ModalPortal
            modalComponent={(onClose) => (
                isLoading ? <div className='center'>
                    <LoadingSpinner/>
                </div> : (
                    <div>
                        <input type="text" value={suggestedTranslation} onChange={(e) => {
                            setSuggestedTranslation(e.target?.value || '')
                        }}
                               className={'input'}
                        />
                        <Button theme={'simple'} onClick={() => {
                            setTranslation(onClose)
                        }}>Send Translation</Button>
                    </div>
                )
            )}
            openModalButtonComponent={(onOpen) => (
                <div
                    className={classNames(styles.translateIcon, {[styles.translateIconDisabled]: !stringToTranslate || disabled})}
                    onClick={onOpen}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496a.99.99 0 0 0 .242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>)}/>
    )
}