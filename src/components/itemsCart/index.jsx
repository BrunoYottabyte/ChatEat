import { useEffect, useState } from 'react';
import SvgUse from '../svg/SvgUse';
import styles from './itemsCart.module.css';

const Items = ({name, price, total}) => {
    const [qtd, setQtd] = useState(1);
    const tot = qtd * price;
    const sub = () => {
        if(qtd <= 1) return;

        setQtd(prev => prev - 1)
    }

    const add = () => {
        setQtd(prev => prev + 1)
    }

    useEffect(() => {
        total(tot)
    }, [tot])

  return (
    <div className={styles.cart_item}>
        <div className={styles.avatar}></div>
        <div className={styles.info_item}>
            <header>
                <p>{name}</p>
                <span>${price}</span>
            </header>

            <footer>
                <div className={styles.quantity}>
                    <span onClick={sub}>-</span>
                    {qtd}
                    <span onClick={add}>+</span>
                </div>
                <SvgUse id="#icon-trash"/>
            </footer>
        </div>
    </div>
  )
}

export default Items