import React from 'react'
import SvgUse from '../svg/SvgUse'
import styles from './nearby.module.css'
import Pizzaria1 from '../../assets/pizzaria1.svg'
import Pizzaria2 from '../../assets/pizzaria2.svg'
import Pizzaria3 from '../../assets/pizzaria3.svg'


const Product = ({ title, img }) => {
    return (
        <div className={styles.product}>
            {img}
            <div className={styles.info}>
                <header>
                    <p>{title}</p>
                    <span>
                        <SvgUse id="#icon-start" />
                        4.5
                    </span>
                </header>
                <footer>
                    <SvgUse id="#icon-map" />
                    <span>4.5 km</span>
                    <div className={styles.status}>
                        Free Delivery
                    </div>
                </footer>
            </div>
        </div>
    )
}

export const NearbyList = () => {

    const items = [
        {
            title: 'Pizza Hut',
            img: <img src={Pizzaria1} alt="Logo do restaurante" />
        },
        {
            title: 'Hotdogs',
            img: <img src={Pizzaria2} alt="Logo do restaurante" />
        },
        {
            title: 'Noodles & Delecious',
            img: <img src={Pizzaria3} alt="Logo do restaurante" />
        }
    ]

    return (
        <div className={styles.categories}>
            <header>
                <h2>Popular Dishes</h2>
                <p>View More <SvgUse id="#icon-arrow-user" /></p>
            </header>

            <div id="list" className={styles.list}
            // ref={list_popular}
            // onMouseLeave={onMouseLeave}
            // onMouseDown={onMouseDown}
            // onMouseEnter={onMouseEnter}
            // onMouseMove={onMouseMove}
            // onMouseUp={onMouseUp}
            >

                {items.map((item, i) => {
                    return (
                        <Product title={item.title}
                            img={item.img }
                            key={i} classe={i == 1 && true}
                        />
                    )
                })}

            </div>
        </div>
    )
}