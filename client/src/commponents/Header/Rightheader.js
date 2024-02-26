import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Logincontext } from '../context/Contextprovider';
import { styled } from '@mui/system'; // Change import to use styled utility
import "./rightheader.css";
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// Using the styled utility instead of makeStyles
const RightheaderContainer = styled('div')({
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
});



const Rightheader = ({  logclose,logoutuser }) => {
    const imgd = "/india.png";
    const { account } = useContext(Logincontext);

    return (
        <div className="rightheader">
            <div className="right_nav">
                {
                account ?
                    <Avatar className="avtar2" >
                        { account.fname[0].toUpperCase()}
                    </Avatar> :
                    <Avatar className="avtar" />
                }
                {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
            </div>
         
            <div className="nav_btn" onClick={()=>logclose()}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Shop By Category</NavLink>
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>
                {
                    account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order</NavLink>
                }
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <div className="flag">
                    <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
                    <img src="data:image/jpeg;base64,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" alt="india flag" style={{ width: 35, marginLeft: 10 }} />
                </div>

                {
                    account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => logoutuser()} style={{ cursor: "pointer", fontWeight: 500 }}>LogOut</h3>
                        </div>
                        : <NavLink to="/login">Login</NavLink>
                }


            </div>
            
          
        </div>
    )
}

export default Rightheader