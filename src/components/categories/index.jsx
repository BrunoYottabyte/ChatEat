import styles from './categories.module.css';

export const Categories = ({name, classe}) => {

  return (
    <div className={`${styles.card} ${classe ? styles.active : ''}`}>
        <div className={styles.product}></div>
        <p className={styles.name}>{name}</p>
    </div>
  )
}
