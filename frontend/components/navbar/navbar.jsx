import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/search_bar';
import MenuContainer from '../menu/menu_container';


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

  componentDidMount(){
    const topnav = document.getElementById('top-nav');
    function check() {
      if (window.scrollY === 0) {
        topnav.classList.remove("not-top");
        document.getElementById('airbnblogo').src=window.logo;
      } else {
        topnav.classList.add("not-top");
        document.getElementById('airbnblogo').src=window.inverted_logo;
      }
    }
    window.addEventListener("scroll", check);
    window.addEventListener("load", check);
  }

  handleLogout(){
    const menu = document.getElementById('top-right-menu');
    menu.classList.remove('show');
    this.props.logout();
    // this.props.history.push('/');
  }

  toggleMenu(){
    document.getElementById('top-right-menu').classList.toggle('hidden');
  }

  render(){
    const message = this.props.currentUser ? `Hello, ${this.props.currentUser.fname}` : 'Welcome to Bedfast';
    const {currentUser} = this.props;
    debugger
    return (
      <div id="top-nav">
        <Link to={'/'}><img id="airbnblogo" src={window.logo} alt="logo" /></Link>
        <p>{message}</p>
        <SearchBar history={this.props.history} />
        <div id="right-nav">
          <div onClick={this.toggleMenu} className="menu-button">
            <div className="menu-icon-item"></div>
            <div className="menu-icon-item"></div>
            <div className="menu-icon-item"></div>
          </div>
          <img className="menu-button" onClick={this.toggleMenu} src={currentUser ? currentUser.profile_pic : window.default_profile_pic} alt="profile-pic" />
          <MenuContainer />
        </div>
      </div>
    )}
      /// will ahve to move login/signup buttons to modal component
}