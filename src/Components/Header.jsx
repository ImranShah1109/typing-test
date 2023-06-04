import React from "react";
import AccountCircle from "./AccountCircle";

const Header = () => {
    return(
        <div className="header">
            <div className="logo">
                LOGO
            </div>
            <div className="user-icon">
                {/* user icon here */}
                <AccountCircle/>
            </div>
        </div>
    )
}

export default Header;