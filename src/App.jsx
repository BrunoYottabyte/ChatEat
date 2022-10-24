import Message from './assets/Message.svg'
import Notification from './assets/Notification.svg'
import styles from './styles.module.css';
import { Svg } from './components/svg';
import SvgUse from './components/svg/SvgUse';
import  react, { useEffect, useState, useRef } from 'react';
import { Categories } from './components/categories';
import { ListPopular } from './components/popular';
import { NearbyList } from './components/nearby';
import Items from './components/itemsCart';
import Cards from './components/cards';

function App() {

  const cards = [
    {name: 'Burguer', price: '25.90'},
    {name: 'Pizza', price: '45.50'},
    {name: 'Chicken', price: '34.99'},
    {name: 'Hotdog', price: '20.99'},
  ]

  const [cardsAddCart, setCardsAddCart] = useState(cards);

  const categories = ['Salad', 'Burger', 'Pizza', 'Hotdog', 'Chicken', 'Sea Food', 'Salad', 'Burger', 'Pizza', 'Hotdog',];  
  const list_categories = useRef(null)
  let newPos = 0
  const [posFinal, setPosFinal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [mode, setMode] = useState('light')

  const Total = (tot) => {
    setAllTotal(tot);
  }

  const [pos, setPos] = useState({
    start: 0,
    dragging: false,
    final: 0
  })

  const onMouseDown = (e) => {
    setPos({
      dragging: true,
      start: e.clientX - list_categories.current.offsetLeft,
    })
    setPosFinal(list_categories.current.scrollLeft);
    const cards = [...list_categories.current.children];
    cards.map(card => card.style.cursor = 'grabbing')
  }    

  const onMouseLeave = () => {
    setPos({
      dragging: false,
      final: newPos,
    })
    list_categories.current.style.cursor = 'initial'
    const cards = [...list_categories.current.children];
    cards.map(card => card.style.cursor = 'default')
  }

  const onMouseUp = (e) => {
     setPos({
      dragging: false,
      final: newPos
    })
    list_categories.current.style.cursor = 'grab'
    const cards = [...list_categories.current.children];
    cards.map(card => card.style.cursor = 'grab')

  }

  
  const onMouseMove = (e) => {
    if(!pos.dragging)return;
    e.preventDefault();
        newPos = pos.start - (e.clientX - list_categories.current.offsetLeft) + posFinal;
      list_categories.current.scrollTo({left: newPos})
    
  }
  
  const onMouseEnter = () => {
    list_categories.current.style.cursor = 'grab'
    const cards = [...list_categories.current.children];
    cards.map(card => card.style.cursor = 'grab')
  }


  const reOrdernar = (index) => {
    let cardUpdated = cardsAddCart;
    cardUpdated.splice(0,0,cardUpdated.splice(index,1)[0])
    setCardsAddCart(cardUpdated)
    console.log(cardUpdated)
  }
  

  return (
    <main className={styles.container}>
      <div className={styles.sidebar}>
        <Svg />
        <header 
        onClick={() => {
          if(mode == 'light'){
            document.body.classList.add('active');
          }else{
            document.body.classList.remove('active');
          }
        }}
        >
          <SvgUse id='#logo' />
        </header>

        <div className={styles.content}>

          <ul>
            <li className={styles.active}><a href="#" ><SvgUse id='#dashboard' /> Dashboard</a></li>
            <li><a href="#"><SvgUse id='#icon-order' />Food order</a></li>
            <li><a href="#"><SvgUse id='#icon-fav' />Favorite</a></li>
            <li><a href="#"><SvgUse id='#icon-recipes' />Recipes</ a></li>
            <li><a href="#"><SvgUse id='#icon-order-time' />Order History</ a></li>
            <li><a href="#"><SvgUse id='#icon-bills' />Bills</ a></li>
            <li><a href="#"><SvgUse id='#icon-support' />Support</ a></li>
            <li><a href="#"><SvgUse id='#icon-settings' />Settings</ a></li>

          </ul>

          <div className={styles.card}>
            <p>Upgrade your Acount to
              Get Free Vouchers  </p>

            <button type='button' >Upgrade Now</button>
          </div>
        </div>
      </div>

      <nav className={styles.hi}>

        <div className={styles.hello}>
          <h1>Hello Bruno Siqueira <SvgUse id="#icon-tchau" /></h1>
          <p>What do you want to Eat?</p>
        </div>

        <div className={styles.items_navbar}>
          <div className={styles.search}>
            <SvgUse id="#search" />
            <input type="text" placeholder='Search...' />
          </div>

          <img src={Message} height={25} />
          <img src={Notification} height={28} />

          <div className={styles.user}>
            <div className={styles.avatar}></div>
            <div className={styles.info_user}>
              <p>Bruno Siqueira</p>
              <span>User</span>
            </div>

            <SvgUse id="#icon-arrow-user" />
          </div>
        </div>

      </nav>
      {/* 2º COL ********************************************** */}
      <div className={styles.content}>
        <div className={styles.banner}>
          <div className={styles.info}>
            <p> Order Now You will be
              Discount Upto 50%</p>

            <button>Get Coupon</button>
          </div>

          <SvgUse id="#icon-motoqueiro" />
        </div>

        {/* Categorias */}

        <div className={styles.categories}>
          <header>
            <h2>Menu Category</h2>
            <p>View More <SvgUse id="#icon-arrow-user" /></p>
          </header>

          <div id="list" className={styles.list} ref={list_categories} 
          onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
             onMouseEnter={onMouseEnter} 
             onMouseMove={onMouseMove} 
             onMouseUp={onMouseUp}
          >
        
              {categories.map((item, i) => {
                return(
                  <Categories name={item} 
                    key={i} classe={i == 1 && true}
                  />
                )
              })}
 
          </div>
        </div>
        {/* Popular */}
       <ListPopular />

       {/* Nearby Restaurants */}

       <NearbyList />

      </div>
      {/*END 2º COL ********************************************** */}


      {/* 3º COL */}

      <div className={styles.aside}>
        <div className={styles.container_cards}>
          {
            cardsAddCart.map((card, i) => {
              return(
                <Cards name={card.name} lengths={cards.length} index={i}  price={card.price} key={i} reOrder={(index) => reOrdernar(index)}/>
              )
            })
          }
        </div>

        <section className={styles.cart}>
            <header>
              <h1>My Cart</h1>
            </header>

            <div className={styles.list}>
            <Items name={'Prawn Biriyani'} price={59} total={(tot) => Total(tot)}/>

            </div>


            <footer>
              <div className={styles.service}>
                <p>Service Tax</p>
                <p>+<span>$</span>2.00</p>
              </div>
              <div className={styles.total}>
                <h1>Total</h1>
                <h2><span>$</span>{allTotal}.00</h2>
              </div>

              <button>Checkout</button>
            </footer>
        </section>
      </div>

    </main>
  )
}

export default App
