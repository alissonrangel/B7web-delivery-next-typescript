import { useState } from 'react';
import styles from './styles.module.css';
import EyeOn from "./EyeOn.svg";
import EyeOff from "./EyeOff.svg";
import Link from 'next/link';

type Props = {
  color: string;
  label: string;
  onClick: () => void;
  fill?: boolean;
}

export const Button = ({color, label, onClick, fill}: Props) => {

  const [focused, setFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div 
      className={styles.container}
      style={{
        color: fill ? '#fff' : color,
        borderColor: color,
        backgroundColor: fill ? color : 'transparent'
      }}
      onClick={onClick}
      >
        {label}
    </div>
  )

}