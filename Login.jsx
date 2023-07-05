import { useState,useContext } from "react";
import React from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import Newlogo from "../images/Newlogo.png";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

import { API } from "../../service/api.js";
/***Handling the css****/
const Boxstyle = styled(Box)`
  padding: 10px;
  width: 400px;
  margin: auto;
  box-shadow: 10px 5px 5px orange;
`;
/***Handling image css***/
/*** Note in object handling css through camel case convention**/
const Image = styled("img")({
  width: 400,
  height: 180,
  margin: "auto",
  display: "flex",
  padding: "2px 0 0",
});
/***css handling for wrapper***/
const Wrapper = styled(Box)`
  padding: 10px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
  & > label {
    color: #fff;
  }
`;

const Error = styled(Typography)`
 font-size:12px;
 color:#ff6161;
 line-height:0;
 margin-top:10px;
 font-weight:600;
`;
const LoginButton = styled(Button)`
  text-transform: none;
  color: blue;
  height: 48px;
  border-radius: 2px;
  font-weight: 500;
  background: linear-gradient(180deg, transparent, #fb641b);
`;
const SignUpbtn = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  font-weight: 500;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
  font-size: 20px;
`;
/****is object mein user value enter krega toh usko store krna padega****/
const signupInitialvalue ={
  Name:'',
  Username:'',
  Password:''
}

const loginInitialValue = {
  Username:'',
  Password:''
}


const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  /**** to store the object signupInitialvalue *** and store into setSignup**/
  const [signup, setSignup] = useState(signupInitialvalue);

  const [error, setError] = useState('');

  const [login,setLogin] = useState(loginInitialValue);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
 
  const toggleSignup = ()=>{
    account ==='signup'? toggleAccount("login") : toggleAccount("signup");
  }

  /** for  storing the value of signup **/
  const onInputChange = (e)=>{
    /***" setSignup(e.target.name,e.target.value); ye value ko overwrite kar dega"***/
    setSignup({...signup,[e.target.name]:e.target.value});
  }
  /** below the function, onclick then enter into the page, and accsess througn axios api calling**/
  const signupUser = async()=>{
    let response = await API.userSignup(signup);

    if(response.isSuccess){
      setError('');
      setSignup(signupInitialvalue);
      toggleAccount('login');
    }else{
      setError('something went wrong ! please try again later');

    }
  }
 /** jaise hein value change hoga onValue change function call ho jayega**/
  const onValueChange = (e)=>{
    /**yeha se login ki jo value hai wo aa jayegi, ab is login k value ko lekar api ko call krna hai , that is in route.js */
    setLogin({...login,[e.target.name]:e.target.value});
  }
  /** login User function **/
  const loginUser = async()=>{
    /** ab yeha pe humko eak api call krni padegi , but kaise 1. go in config.js*/

    let response = await API.userLogin(login);

    if(response.isSuccess)
    {
      setError('');

      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

      setAccount({Username:response.data.Username,Name:response.data.Name});
      isUserAuthenticated(true);
      navigate('/');

    }else{
      setError('Something went wrong ! please try again later');
    }

  }

  return (
    <Boxstyle>
      <Box>
        <Image src={Newlogo} alt="logo" />
        {
         account === "login" ? 
            <Wrapper>
                 <TextField label=" Enter Username" variant="standard" value={login.Username} onChange={(e)=>onValueChange(e)} name="Username"/>
                 <TextField label=" Enter Password" variant="standard" value={login.Password} onChange={(e)=>onValueChange(e)} name="Password"/>

                 {error && <Error>{error}</Error>}
                 <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                 <Typography style={{ textAlign: "center",fontWeight: "100",color: "#3c3c3c",}}> OR</Typography>
                 <SignUpbtn onClick={()=>toggleSignup()} style={{ color: "slateblue" }}> Create an account ?</SignUpbtn>
            </Wrapper>
        : 
            <Wrapper>
               <TextField  onChange={(e)=>onInputChange(e)}  label="Name" variant="standard"  name="Name"/>
               <TextField onChange={(e)=>onInputChange(e)}  label="Username" variant="standard" name="Username"/>
               <TextField onChange={(e)=>onInputChange(e)}  label="Password" variant="standard"name="Password" />


               {error && <Error>{error}</Error>}
               <SignUpbtn onClick={()=>signupUser()}  variant="contained">Signup</SignUpbtn>
               <Typography style={{textAlign: "center",fontWeight: "100",color: "#3c3c3c",}}>OR</Typography>
               <LoginButton onClick={()=>toggleSignup()} variant="contained" style={{ color: "slateblue" }}>
                 Already have an account ?
              </LoginButton>
           </Wrapper>
        }
      </Box>
    </Boxstyle>
  );
};
/***This login component , imported in App.js**/
export default Login;
