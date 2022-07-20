
import styles from "../../styles/Login.module.css";


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

const Login = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(()=> {
    setTenant(data.tenant);
  }, [])

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>
      <Header 
        color={data.tenant.mainColor}
        backHref={`/${data.tenant.slug}`}
      />
      <InputField 
        color={data.tenant.mainColor}
        placeholder="Digite seu e-mail"
        value={email}
        onChange={setEmail}
      />
      <InputField 
        color={data.tenant.mainColor}
        placeholder="Digite sua senha"
        value={password}
        onChange={setPassword}
        password={true}
      />
    </div>
  )
}

export default Login

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

