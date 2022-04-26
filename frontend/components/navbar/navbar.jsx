import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/search_bar';
import MenuContainer from '../menu/menu_container';
import logo from '../../../app/assets/images/airbnblogo.png';

// const NavBar = (props) => {
//   return (
//     <div>
//       <div className="topnav">
//         <Link to={'/'}>Bedfast</Link>
//         <div className="topnav-right">
//           {props.currentUser ? <button onClick={props.logout}>Logout</button> : <></>}
//           <Link to={'/login'}>Login</Link> :
//           <Link to={'/signup'}>Sign Up</Link>
//           <a href="/">Search</a>
//         </div>
//       </div>
//     </div>
//   )
// }

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout=this.handleLogout.bind(this);
    this.toggleMenu=this.toggleMenu.bind(this);
  }

  handleLogout(){
    this.props.logout();
    // this.props.history.push('/');
  }

  toggleMenu(){
    const menu = document.getElementById('top-right-menu');
    menu.classList.toggle('show');
  }

  render(){
    const message = this.props.currentUser ? `Hello, ${this.props.currentUser.fname}` : 'Welcome to Bedfast';
    return (
      <div id="top-nav">
        <div>
        <img id="airbnblogo" src={logo} alt="logo" />
        <Link to={'/'}>{message}</Link>
        </div>
        <SearchBar />
        <div id="right-nav">
          <div onClick={this.toggleMenu} className="menu-button">
            <div className="menu-icon-item"></div>
            <div className="menu-icon-item"></div>
            <div className="menu-icon-item"></div>
          </div>
          <MenuContainer />
        </div>
      </div>
    )}
      /// will ahve to move login/signup buttons to modal component
}