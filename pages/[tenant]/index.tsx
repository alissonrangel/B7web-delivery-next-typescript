import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/usiApi'
import styles from '../../styles/Home.module.css'
import { Product } from '../../types/Product'
import { Tenant } from '../../types/Tenant'

const Home = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(()=> {
    setTenant(data.tenant);
  }, [])

  const [products, setProducts] = useState<Product[]>(data.products);
  
  //const api = useApi();

  // const tenant = await api.getTenant('b7burger');
  // if (!tenant) {
  // }

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
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      <Banner />
      <div className={styles.grid}>
        {/* <ProductItem data={{id: 1, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:'R$ 25,50'}} mainColor={data.tenant.mainColor} secondColor={data.tenant.secondColor}/> */}
        {/* <ProductItem data={{id: 1, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:25.50}} />
        <ProductItem data={{id: 2, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:35.50}} />
        <ProductItem data={{id: 3, image:'/tmp/burger.png', categoryName: 'Tradicional', name:'Texas Burger', price:24.50}} /> */}

        { products.map( (item, index) => (
          <ProductItem key={index} data={item} />
        )) }
      </div>
    </div>
  )
}

export default Home

type Props = {
  tenant: Tenant,
  products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug } = context.query;

  console.log('TENANT:', tenantSlug);

  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();
  
  console.log("deneednejnTENENT ", tenant);
  
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products
    }
  }
}

