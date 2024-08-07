import styles from './header.module.css'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import React, {SVGProps, useEffect, useState} from 'react';
import {JSX} from 'react/jsx-runtime';
import {useBrFunctions} from "../../helpers/hooks/useBrFunctions";
import {ScrollIcon} from "../shared/icons/ScrollIcon/ScrollIcon";
import {GoldButton} from "../GoldButton/GoldButton";

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
)

export const Header = () => {

    const {getOverlordAvailableBr} = useBrFunctions();

    const [isBackArrowVisible, setIsBackArrowVisible] = useState<boolean>(false)
    const [freeBr, setFreeBr] = useState<number>(getOverlordAvailableBr());

    const navigate = useNavigate();
    const location = useLocation();

    const getBrStylesForOrb = (currentBr: number): React.CSSProperties => {

        const styles: React.CSSProperties = {}

        if (-100 <= currentBr || currentBr <= 100) {
            styles.height = `${Math.abs(currentBr)}%`
        } else {
            styles.height = '100%'
        }

        if (currentBr > 0) {
            styles.background = 'radial-gradient(circle, rgba(53,61,173,1) 30%, rgba(22,52,91,0.9) 100%)'
        }

        return styles;
    }

    useEffect(() => {
        setFreeBr(getOverlordAvailableBr())
    }, [getOverlordAvailableBr])

    useEffect(() => {
        setIsBackArrowVisible(location.pathname !== '/players')
    }, [location])

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.navigationIcon}>
                    {isBackArrowVisible ? (
                        <ArrowBackIcon onClick={() => {
                            navigate(`/players`)
                        }} className={styles.extraBackArrowIcon}/>) : (
                        <ScrollIcon onClick={() => {
                            navigate(`/settings`)
                        }}/>
                    )}
                </div>

                <GoldButton/>

                {/*<ModalPortal modalComponent={(onClose) => (<SaveBeforeLeaveModal onLeaveButtonCLick={() => {*/}
                {/*        onClose();*/}
                {/*        navigate(`/players`)*/}
                {/*    }}/>)} openModalButtonComponent={(onOpen) => (*/}
                {/*        <ArrowBackIcon onClick={onOpen} className={styles.extraBackArrowIcon}/>)}*/}
                {/*    />*/}
                {/*)}*/}

                <div className={styles.orbRoot}>
                    <div className={styles.orb}>
                        <div className={styles.glass}></div>
                        <div className={styles.amount} style={getBrStylesForOrb(freeBr)}></div>
                        <div className={styles.orbText}>{freeBr}</div>
                    </div>
                </div>

            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <div className={styles.footer}></div>
        </div>
    )
}