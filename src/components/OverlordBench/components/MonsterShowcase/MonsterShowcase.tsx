import React from "react";
import {ModalPortal} from "../../../Modal/ModalPortal";
import 'swiper/css';
import 'swiper/css/navigation';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import styles from './monster-showcase.module.css'
import {MonsterCard} from "../MonsterCard/MonsterCard";
import {useGetOverlordPicks} from "../../../../helpers";

export const MonsterShowcase = () => {

    const {
        getOverlordOpenGroups,
    } = useGetOverlordPicks();
    const openGroupMonsters = getOverlordOpenGroups()

    const SwiperNextButton = () => {
        const swiper = useSwiper();
        return (
            <button className={styles.swiperArrow} onClick={() => {
                swiper.slideNext()
            }}>NEXT</button>
        )
    }

    const SwiperPreviousButton = () => {
        const swiper = useSwiper();
        return (
            <button className={styles.swiperArrow} onClick={() => {
                swiper.slidePrev()
            }}>BACK</button>
        )
    }

    return (
        <ModalPortal modalComponent={
            (onClose) => (
                <Swiper className={styles.swiper} slidesPerView={1} spaceBetween={15} loop>
                    {openGroupMonsters?.map(monsterName => (
                        <SwiperSlide>
                            <MonsterCard monsterName={monsterName}/>
                        </SwiperSlide>
                    ))}
                    <div className={styles.swiperArrowContainer}>
                        <SwiperPreviousButton/>
                        <SwiperNextButton/>
                    </div>
                </Swiper>
            )
        } openModalButtonComponent={
            (onOpen) => (
                <input type="text" readOnly value={'Monster Showcase'} onClick={onOpen}
                       className={'input'}
                />
            )
        }/>
    )
}