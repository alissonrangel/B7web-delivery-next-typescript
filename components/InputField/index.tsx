import { useState } from 'react';
import styles from './styles.module.css';
import EyeOn from "./EyeOn.svg";
import EyeOff from "./EyeOff.svg";
import Link from 'next/link';

type Props = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  password?: boolean;
}

export const InputField = ({color, placeholder, value, onChange, password}: Props) => {

  const [focused, setFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div 
      className={styles.container}
      style={{
        borderColor: focused ? color : '#f9f9fb',
        backgroundColor: focused ? '#fff' : '#f9f9fb'
      }}
      >
        
        <input
          type={password ? (showPassword ? 'text':'password'):'text'} 
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={ e => onChange(e.target.value)}
          onFocus={()=> setFocused(true)}
          onBlur={()=> setFocused(false)}
        />
        { password &&
        <div 
          className={styles.showPassword}
          onClick={toggleShowPassword}
          >
          { showPassword && <EyeOn color="#bbb" />}
          { !showPassword && <EyeOff color="#bbb" />}
        </div>
        } 
    </div>
  )

}