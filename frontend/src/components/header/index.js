import React from 'react'
import logo from './images/logo.png'
import { Search } from '../search'
import { Basket } from '../basket'
import './style.scss'

export function Header() {
	return (
		<header className="header">
      <div className="logo_wrapper">
        <img className="logo" src={logo} alt="hepsiburada" />
      </div>
      <Search />
      <Basket />
		</header>
	)
}
