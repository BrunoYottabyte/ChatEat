import styles from './cards.module.css';

import React, { useEffect, useRef, useState } from 'react'
import SvgUse from '../svg/SvgUse';

const Cards = ({ name, price, lengths, index, reOrder }) => {

    const card_ref = useRef(null);
    const [sibling, setSibling] = useState('');
    const generatorRandom = () => {
        return Math.floor(Math.random() * 13);
    }

    useEffect(() => {
        card_ref.current.style.transform = 'translateY(0)'
        card_ref.current.style.visibility = 'visible'
        card_ref.current.style.transition = '0.3s'
        card_ref.current.style.transitionDelay = `0.${index + 1}s`;


        if (index == lengths - 1) {
            card_ref.current.style.zIndex = index + 1
            return
        };
        let random = generatorRandom();
        if (random <= 3) generatorRandom();
        card_ref.current.style.opacity = 0.2;
        if (index == lengths - 2) {
            card_ref.current.style.opacity = 0.4;
        }

        if (random > 5) {
            card_ref.current.style.transform = `rotate(-${random}deg)`
        } else {
            card_ref.current.style.transform = `rotate(${random}deg)`
        }
        card_ref.current.style.zIndex = index + 1;

    }, [])

    const [positions, setPositions] = useState({
        initial: 0,
        offX: 0,
        offY: 0,
        dragging: false
    })

 
    const dragging = (e) => {
        
        if(!positions.dragging) return;
        card_ref.current.style.cursor = 'grabbing'
        e.preventDefault();
        let x = e.screenX - positions.offX;
        let y = e.screenY - positions.offY;
    
        card_ref.current.style.left = `${x}px`
        card_ref.current.style.top = `${y}px`

        if(sibling){
            sibling.style.opacity = 1;
            sibling.style.transform = 'rotate(0deg)'
            sibling.style.transition = '.4s'
            sibling.style.transitionDelay = '0.25s';
        }


    }

    const mouseUp = (e) => {
 
        card_ref.current.style.animationName = 'hideCard';
        card_ref.current.style.animationDuration = '0.5s'
        card_ref.current.style.transition = "0.5s";
        card_ref.current.style.zIndex = 0;
        card_ref.current.style.left = '0px'
        card_ref.current.style.top = '0px'
        setPositions({
            dragging: false
        })

      
        const cards = [...document.querySelectorAll('.card_item')];
        const filtered = cards
        .filter(card => card.attributes.index.value !== card_ref.current.attributes.index.value);
        filtered.map((card, i) => {
            let random = generatorRandom();
            if(i == filtered.length - 1) {
                card.style.zIndex = card.style.zIndex + 1;
                return
            } 
            if (random > 5) {

                card.style.transform = `rotate(-${random}deg)`
            } else {
                card.style.transform = `rotate(${random}deg)`
            }
  
            return card.style.zIndex = card.style.zIndex + 1;
        })
        reOrder(card_ref.current.attributes.index.value)
    }

    const mouseLeave = (e) => {
  
        card_ref.current.style.transition = "0.3s";
        card_ref.current.style.left = '0px'
        card_ref.current.style.top = '0px'
        setPositions({
            dragging: false
        })
    }

    const Down = (e) => {
        card_ref.current.style.transition = '0s'
        card_ref.current.style.cursor = 'grabbing'
        setPositions({
                initial: e.clientX,
                offX: e.clientX ,
                offY: e.clientY,
                dragging: true,
        })

        setSibling(e.target.previousElementSibling);
    }

    const mouseEnter = () => {
        card_ref.current.style.cursor = 'grab'
    }
    return (
        <div ref={card_ref} className={`${styles.card} card_item`} index={index} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter} onMouseDown={Down} onMouseMove={dragging} onMouseUp={mouseUp}>
            <div className={styles.content_card}>
                <SvgUse id="#icon-fav-white" />

                <footer>
                    <div className={styles.info_product}>
                        <div>
                            <p>{name}</p>
                            <SvgUse id="#icon-estrela" />
                        </div>
                        <p>${price}</p>
                    </div>

                    <button>Add to Cart</button>
                </footer>
            </div>
        </div>
    )
}

export default Cards