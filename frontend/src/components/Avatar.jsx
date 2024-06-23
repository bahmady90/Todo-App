import React, { useState } from 'react'
import styles from './Avatar.module.css'

export default function Avatar({img, onHandleClick, selectedAvatar}) {

    const avatarIsSelected = img === selectedAvatar

  return (
    <div>
      <img className={avatarIsSelected ? styles.selectedAvatar : ""}
      src={img} alt="avatarimage" onClick={onHandleClick}></img>
    </div>
  )
}
