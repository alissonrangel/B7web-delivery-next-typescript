import { useState } from 'react';
import styles from './styles.module.css';
import EyeOn from "./EyeOn.svg";
import EyeOff from "./EyeOff.svg";
import Link from 'next/link';
import MailSent from "./MailSent.svg";

type Props = {
  icon: string;
  color: string;
  width: number;
  height: number;
}

export const Icon = ({icon, color, width, height}: Props) => {

  return (
    <div style={{ width, height}}>
      { icon === 'MailSent' && <MailSent color={color} /> }
    </div>
  )

}