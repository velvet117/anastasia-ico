import React from 'react'
const Header = () => {
  return (
    <nav id="nav" className="navbar pure-g pure-menu pure-menu-horizontal">
      <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-3">
        <a href="#" className="pure-menu-heading pure-menu-link pure-img site-logo" ></a>
      </div>
      <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-3 header-middle">
        <h1>Anastasia Blodgett <br/> Fundraiser <br />(KOVAN NETWORK)</h1>
      </div>
      <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-3 header-right">
        <a href="https://github.com/" target="_blank" className="pure-menu-link fa fa-github fa-2x"></a>
        <a href="https://medium.com/" target="_blank" className="pure-menu-link fa fa-medium fa-2x"></a>
        <a href="https://t.me/" target="_blank" className="pure-menu-link fa fa-telegram fa-2x"></a>
        <a href="http://slack.com/" target="_blank" className="pure-menu-link fa fa-slack fa-2x"></a>
      </div>
    </nav>
  )
}

export default Header;