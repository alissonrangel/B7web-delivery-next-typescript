import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Banner } from '../../../components/Banner'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { ProductItem } from '../../../components/ProductItem'
import { Quantity } from '../../../components/Quantity'
import { SearchInput } from '../../../components/SearchInput'
import { useAppContext } from '../../../contexts/AppContext'
import { useFormatter } from '../../../libs/useFormatter'
import { useApi } from '../../../libs/usiApi'
import styles from '../../../styles/Product-id.module.css'
import { Product } from '../../../types/Product'
import { Tenant } from '../../../types/Tenant'

const Product = (data: Props) => {

  const { tenant, setTenant } = useAppContext();
  useEffect(()=> {
    setTenant(data.tenant);
  }, [])

  const [qtCount, setQtCount] = useState(0);

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  }

  const { formatPrice } = useFormatter()

  const handleAddToCart = () => {

  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>

      <div className={styles.headerArea}>
        <Header 
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
          title='Produto'
          invert
        />
      </div>
      <div className={styles.headerBg} style={{ backgroundColor: data.tenant.mainColor}}>
        
      </div>
      <div className={styles.productImage}>
        <img src={data.product.image} alt="" />
      </div>
      <div className={styles.category}>
        {data.product.categoryName}
      </div>
      <div className={styles.title}
        style={{borderBottomColor: data.tenant.mainColor}}>
        {data.product.name}
      </div>
      <div className={styles.line}>        
      </div>
      <div className={styles.description}>
        {data.product.description}
      </div>
      <div className={styles.qtText}>
        Quantidade
      </div>
      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
            max={10}
            
            />
        </div>
        <div className={styles.areaRight} style={{color: data.tenant.mainColor}}>
          {formatPrice(data.product.price)}
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button 
          color={data.tenant.mainColor}
          label='Adicionar a sacola'
          onClick={handleAddToCart}
          fill
        />
      </div>
    </div>
  )
}

export default Product

type Props = {
  tenant: Tenant,
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug, id } = context.query;

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

  const product = await api.getProduct(id as string);

  return {
    props: {
      tenant,
      product
    }
  }
}

