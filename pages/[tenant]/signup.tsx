
import styles from "../../styles/SignUp.module.css";


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

const SignUp = (data: Props) => {

  const { tenant, setTenant } = useAppContext();

  useEffect(()=> {
    setTenant(data.tenant);
  }, [])

  const router = useRouter();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Cadastrar | {data.tenant.name}</title>
      </Head>
      <Header 
        color={data.tenant.mainColor}
        backHref={`/${data.tenant.slug}/login`}
      />
      <div className={styles.header}>{data.tenant.name}</div>
      <div 
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}
      >Preencha os campos para criar o seu cadastro.</div>
      <div className={styles.line}></div>
      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite seu nome"
            value={name}
            onChange={setName}
          />
        </div>
        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={styles.inputArea}>
          <InputField 
            color={data.tenant.mainColor}
            placeholder="Digite sua senha"
            value={password}
            onChange={setPassword}
            password={true}
          />
        </div>

        <div className={styles.inputArea}>
          <Button 
            color={data.tenant.mainColor}
            label="Cadastrar"
            onClick={() => console.log("CLICOU")}
            fill
          />
        </div>
      </div>
      <div 
        className={styles.forgetArea}    
        >
        Já tem cadastro? 
        <Link href={`/${data.tenant.slug}/login`}>
          <a
            style={{color: data.tenant.mainColor}}
          > Fazer Login</a>
        </Link>
      </div>
      {/* <div className={styles.line}></div>
      <div className={styles.signupArea}>
        <Button 
          color={data.tenant.mainColor}
          label="Quero me cadastrar"
          onClick={handleSignUp}        
        /> 
      </div> */}
      {/* <Button 
        color={data.tenant.mainColor}
        label="Entrar"
        onClick={() => console.log("CLICOU")}
        fill
       />
       <Button 
        color={data.tenant.mainColor}
        label="Entrar"
        onClick={() => console.log("CLICOU")}        
       /> */}
    </div>
  )
}

export default SignUp

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

