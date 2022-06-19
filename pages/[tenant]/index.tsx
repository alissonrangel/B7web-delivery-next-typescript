import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import styles from '../../styles/Home.module.css'

const Home = () => {

  const handleSearch = (searchValue: string) => {
    console.log("Você está buscando o, ", searchValue);
    
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem Vindo (a) 👋 </div>
            <div className={styles.headerSubtitle}>O que deseja pra hoje?</div>
          </div>
          <div className={styles.headerTopRight}>
            <div className={styles.menuButton}>
              <div className={styles.menuButtonLine}></div>
              <div className={styles.menuButtonLine}></div>
              <div className={styles.menuButtonLine}></div>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput mainColor='#fb9400' onSearch={handleSearch} />
        </div>
      </header>
      <Banner />
      <div className={styles.grid}>
        <ProductItem data={{id: 1, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:'R$ 25,50'}} mainColor='#FB9400' secondColor='#FFF9F2'/>
        <ProductItem data={{id: 2, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:'R$ 25,50'}} mainColor='#FB9400' secondColor='#FFF9F2'/>
        <ProductItem data={{id: 3, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:'R$ 25,50'}} mainColor='#FB9400' secondColor='#FFF9F2'/>
      </div>
    </div>
  )
}

export default Home
