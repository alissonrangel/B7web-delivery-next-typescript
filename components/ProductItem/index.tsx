import Link from 'next/link';
import { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Product } from '../../types/Product';
import styles from './styles.module.css';

type Props = {
  data: Product;
  //mainColor: string;
  //secondColor: string;
}

export const ProductItem = ({data}: Props) => {

  const { tenant } = useAppContext();

  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleInputFocus = () => {
    setFocused(true);
  }
  const handleInputBlur = () => {
    setFocused(false);
  }
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(event.code);

    if( event.code === 'Enter'){
      //onSearch(searchValue)
    }
  }
  return (
    <Link href={`/${tenant?.slug}/product/${data.id}`}>
      <a className={styles.container} >
        <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
        <div className={styles.info}>             
          <div className={styles.img}><img src={data.image} alt="" /></div>
          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.price} style={{color: tenant?.mainColor}}>{data.price}</div>
        </div>
      </a>
    </Link>    
  )

}