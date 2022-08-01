
import styles from "../../styles/ForgetSuccess.module.css";


import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Banner } from '../../components/Banner'
import { ProductItem } from '../../components/ProductItem'
import { SearchInput } from '../../components/SearchInput'
import { useAppContext } from '../../contexts/AppContext'
import { useApi } from '../../libs/usiApi'
import { Tenant } from '../../types/Tenant'
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "../../components/Icon";


const ForgetSuccess = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(()=> {
    setTenant(data.tenant);
  }, [])

  const router = useRouter();

  const [ email, setEmail ] = useState('');

  const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/login`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Forget Success | {data.tenant.name}</title>
      </Head>
      <Header 
        color={data.tenant.mainColor}
        backHref={`/${data.tenant.slug}/forget`}
      />

      <div className={styles.iconArea}>
        <Icon icon="MailSent" width={99} height={81} color={data.tenant.mainColor} />
      </div>
      

      <div className={styles.title}>Verifique seu e-mail</div>

      <div 
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}
      >Enviamos as instruções para recuperação de senha para o seu e-mail.</div>
      
      <div className={styles.formArea}>                       
        <div className={styles.inputArea}>
          <Button 
            color={data.tenant.mainColor}
            label="Fazer Login"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default ForgetSuccess

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug } = context.query;

  console.log('TENANT:', tenantSlug);

  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();
  
  if (!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      tenant
    }
  }
}

