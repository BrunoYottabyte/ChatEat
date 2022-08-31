import { useRef, useState } from 'react';
import SvgUse from '../svg/SvgUse';
import styles from './popular.module.css';

const Popular = ({ name, classe }) => {
    return (
        <div className={styles.container}>
        <div className={`${styles.card} ${classe ? styles.active : ''}`}>
            <div className={styles.product}></div>
            <span className={styles.ribbon}>15% off</span>
            <span className={styles.rank}>
              <SvgUse id="#icon-start" />  <p>4.5</p>
            </span>
        </div>
        <div className={styles.details}>
            <p>{name}</p>
            <span>$14.45</span>
        </div>
        </div>
    )
}

export const ListPopular = () => {

    const items = ['Pizzaria Don Leal', 'Sallate Italliano', 'Sausage Pizza', 'Prawn Biriyani', 'Pizzaria do Apollo', 'Qualquer 1', 'Qualquer 2']
    let newPos = 0;
    const list_popular = useRef(null);
    const [posFinal, setPosFinal] = useState(0);

    const [pos, setPos] = useState({
        start: 0,
        draggable: false
    })
    const onMouseLeave = () => {

        setPos({
            draggable: false
        })
        list_popular.current.style.cursor = 'default';
        const cards = [...list_popular.current.children];
        cards.map(card => card.style.cursor = 'default');
        setPosFinal(list_popular.current.scrollLeft)
    }

    const onMouseDown = (e) => {
        setPos({
            start: e.clientX - list_popular.current.offsetLeft,
            draggable: true
        })

        list_popular.current.style.cursor = 'grabbing';
        const cards = [...list_popular.current.children];
        cards.map(card => card.style.cursor = 'grabbing');
    } 

    const onMouseEnter = () => {
        list_popular.current.style.cursor = 'grab';

        const cards = [...list_popular.current.children];
        cards.map(card => card.style.cursor = 'grab');
    }

    const onMouseMove = (e) => {
        if(!pos.draggable) return;
        e.preventDefault();

        newPos = pos.start - (e.clientX - list_popular.current.offsetLeft) + posFinal;
   
        list_popular.current.scrollTo({left: newPos})
    }

    const onMouseUp = (e) => {
        setPos({
            draggable: false
        })
        list_popular.current.style.cursor = 'grab';
        const cards = [...list_popular.current.children];
        cards.map(card => card.style.cursor = 'grab');
        setPosFinal(list_popular.current.scrollLeft)
    }

    return(
        <div className={styles.categories}>
        <header>
            <h2>Popular Dishes</h2>
            <p>View More <SvgUse id="#icon-arrow-user" /></p>
        </header>

        <div id="list" className={styles.list} 
        ref={list_popular}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >

            {items.map((item, i) => {
                return (
                    <Popular name={item}
                        key={i} classe={i == 1 && true}
                    />
                )
            })}

        </div>
    </div>
    )
}


