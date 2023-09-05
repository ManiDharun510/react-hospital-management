import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";

function Admin(){
//---------------------Login------------------------------//
        const navigate = useNavigate();

        const checkingEmptyValidation=(value)=>{
                if(value){
                return true;
                }
                else {
                return false;
                }
        }
        const minLengthValidation=(value)=>{
                if(value.length>3){
                return true;
                }
                else {
                return false;
                }
        };

        const [inputlg, setInputlg] = useState({
                email: "",
                password: ""
        });

        const onChangeHandlerLG = (event)=>{
                let name= event.target.name;
                let value= event.target.value;
                setInputlg({...inputlg, [name]: value})
                console.log(inputlg);
        
        };
        const onSubmitHandlerLG = (event)=>{
                event.preventDefault();
                if(!checkingEmptyValidation(inputlg.email) || !minLengthValidation(inputlg.email)){
                alert("Email cannot be empty and minlength is 5");
                return;
                }
                if(!checkingEmptyValidation(inputlg.password) || !minLengthValidation(inputlg.password)){
                alert("Password cannot be empty and minlength is 5");
                return;
                }
                axios.get(`http://localhost:4000/admin/${inputlg.email}/${inputlg.password}`)
                .then((result)=>{
                console.log(result.data)
                if(result.data && result.data.length>0){
                sessionStorage.setItem("email", inputlg.email);
                sessionStorage.setItem("LS", "true");
                navigate("/ap");
                } 
                else{
                alert("Email and password not matching");
                }
        }).catch((error)=>{
        console.log(error);
        });
        };


return(<>
   

<div className="a_container" >
        
        <form>
        <h3 className='a_center'><b>Admin Login</b></h3>
        <div className="form-group ">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input type="email" name="email" className="form-control" onChange={onChangeHandlerLG} aria-describedby="emailHelp" placeholder="Your email"/>                 
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" name="password" className="form-control" onChange={onChangeHandlerLG} placeholder="Your Password"/>
        </div>
        <button type="submit" onClick={onSubmitHandlerLG} className="btn btn-primary">Submit</button>
        </form>
        </div>

</>

)
}
export default Admin;