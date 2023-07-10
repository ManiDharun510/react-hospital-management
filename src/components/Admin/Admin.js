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
                axios.get(`http://localhost:3000/medregistrationadmin?email=${inputlg.email}&password=${inputlg.password}`).then((result)=>{
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
   

<div className="container" >
        <div className="box">
        <form>
        <p><b>Admin Login</b></p><hr/>
        <div className="form-group">
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
</div>  

</>

)
}
export default Admin;






// const onSubmitHandlerSU = (event)=>{
//         event.preventDefault();
//         if(!checkingEmptyValidation(input.username) || !minLengthValidation(input.username)){
//                 alert("NameSU cannot be empty and minlength is 5");
//                 return;
//               }
//         if(!checkingEmptyValidation(input.email) || !minLengthValidation(input.email)){
//                 alert("Email cannot be empty and minlength is 5");
//                 return;
//               }
//         if(!checkingEmptyValidation(input.password) || !minLengthValidation(input.password)){
//                 alert("Password cannot be empty and minlength is 5");
//                 return;
//               }
//         axios.post('http://localhost:3000/medregistration', input).then((value)=>{
//         sessionStorage.setItem("email", input.email);
//         sessionStorage.setItem("LS", "true");
//         console.log(value.data);
//         clearingData();
//         navigate('/pp');
// }).catch((error)=>{
//         console.log(error);
// });
// };
// const clearingData = ()=>{
        
// };

// const onChangeHandlerSU = (event)=>{
//         let name= event.target.name;
//         let value= event.target.value;
//         setInput({...input, [name]: value})
        
// };
// const [input, setInput] = useState({
//         username: "",
//         email: "",
//         password: ""
// });