import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { DispatchType, RootState } from '../../Redux/Store';
import { forgotPassword, resetDetails } from '../../Redux/Slices/PersonSlice';
import { Link } from 'react-router-dom';

export const ForgotPassword:React.FC = () => {

    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [oldpassword, setoldPassword] = useState<string>("");
    const [newpassword, setnewPassword] = useState<string>("");


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
          if(e.target.name== "email")  setEmail(e.target.value);
          else if (e.target.name =="oldpassword") setoldPassword(e.target.value);
          else if (e.target.name== "newpassword") setnewPassword(e.target.value);
     }



     const reset:resetDetails= {
        email: email,
        old: oldpassword,
        new: newpassword
     }

    const handleForgot = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("button clicked! "+reset.email);
        dispatch(forgotPassword(reset)).then(()=>{
            clearAllInputs();
        });
       
  };

  const  clearAllInputs = ()=>{
    var elements = document.getElementsByTagName("input");
for (var ii=0; ii < elements.length; ii++) {
  if (elements[ii].type == "text") {
    elements[ii].value = "";
  }
}
}

return(
    <div className="login">
        <h1>Reset Your Password</h1>
        <form id="auth">
            {userState.resetError ? <h3>Invalid Credentails</h3> : <></>}
            {userState.isReset  ? <h1 className="h1Auth">Please Login New Password</h1> : <></>}
            <input id= "email" name="email" placeholder="Your email" onChange={handleChange}></input>
            <input id= "oldpassword" name="oldpassword" placeholder="Old Password" onChange={handleChange}></input>
            <input id= "newpassword" name="newpassword" placeholder="New password" onChange={handleChange}></input>
            <button id="login" className="authentication" onClick = {handleForgot}>Reset Password</button>
            <Link to="/login" className="registerLinkFromLogin">Login</Link>
        </form>
    </div>
)
}