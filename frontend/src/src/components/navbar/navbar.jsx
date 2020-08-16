import React, {useState} from 'react';
import '../../stylesheets/navigation/navbar.css';
import NavBarOverlay from './navbarOverlay';


const NavBar = (props) => {

    const [overlay, setOverlay] = useState(false);

    const activateNavBar = (event) => {
        const navBar = document.getElementById("navbarIcon");
        if (navBar.className === "navbarIcon") {
            navBar.className += " responsive"
            setOverlay(true)
        } else{
            navBar.className = "navbarIcon"
            setOverlay(false)
        }
    };

    return(
        <div className={"navbarWrapper"}>
            <NavBarOverlay overlay={overlay} />
            <div className={"navbarIcon"} id={"navbarIcon"} onClick={activateNavBar}>
                <div className={"firstIcon"}></div>
                <div className={"secondIcon"}></div>
                <div className={"thirdIcon"}></div>
            </div>
        </div>
    )
};

export default NavBar;