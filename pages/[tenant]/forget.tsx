
import styles from "../../styles/Forget.module.css";


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

const Forget = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(()=> {
    setTenant(data.tenant);
  }, [])

  const router = useRouter();

  const [ email, setEmail ] = useState('');

  const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/forget-success`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>
      <Header 
        color={data.tenant.mainColor}
        backHref={`/${data.tenant.slug}/login`}
      />
      <div className={styles.header}>{data.tenant.name}</div>

      <div className={styles.title}>Esqueceu sua senha?</div>

      <div 
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}
      >Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.</div>
      <div className={styles.line}></div>
      <div className={styles.formArea}>        
        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>        
        <div className={styles.inputArea}>
          <Button 
            color={data.tenant.mainColor}
            label="Enviar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default Forget

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { tenant: tenantSlug } = context.query;

  console.log('TENANT:', tenantSlug);

  const api = useApi();

  const tenant = await api.getTenant(tenantSlug as string);
  
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

