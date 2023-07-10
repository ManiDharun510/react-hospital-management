import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Patient.css";

function Patient(){

//---------------------Login------------------------//
        const navigate = useNavigate();
        const [inputlg, setInputlg] = useState({
                mblno:""
        });
        const onChangeHandlerLG = (event)=>{
                let name= event.target.name;
                let value= event.target.value;
                setInputlg({...inputlg, [name]: value})
        };
        const checkingEmptyValidation=(value)=>{
                if(value){
                return true;
                }
                else {
                return false;
                }
        };
        const minLengthValidation=(value)=>{
                if(value.length>3){
                return true;
                }
                else {
                return false;
                }
        };
        const onSubmitHandlerLG = (event)=>{
                event.preventDefault();
                if(!checkingEmptyValidation(inputlg.mblno) || !minLengthValidation(inputlg.mblno)){
                alert("Enter Valid Number");
                return;
                }
              
                axios.get(`http://localhost:3000/medregistration?mblno=${inputlg.mblno}`).then((result)=>{
                if(result.data && result.data.length>0){
                sessionStorage.setItem("Mobile", inputlg.mblno);
                sessionStorage.setItem("LS", "true");
                navigate("/pp");
                } 
                else{
                alert("Enter Valid Number");
                }
                }).catch((error)=>{
                console.log(error);
                });
        };


        return(<>
   

        <div className="container" >
        <div className="box">
        <form>
        <p><b>Patient Login</b></p><hr/>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Mobile Number</label>
        <input type="number" name="mblno" className="form-control" onChange={onChangeHandlerLG} aria-describedby="emailHelp" placeholder="Mobile Number"/>                 
        </div>
        
        <button type="submit" onClick={onSubmitHandlerLG} className="btn btn-primary">Submit</button>
        </form>
        </div>
        </div>  

</>

)
}
export default Patient;

{/* <div className="container" >


<div className="box vr">
<form>
<p><b>Sign Up</b></p><hr/>
<div className="form-group shrink">
<label>Name</label>
<input type="text" name="username" className="form-control" onChange={onChangeHandlerSU}  placeholder="Your name"/>
</div>
<div className="form-group shrink">
<label for="exampleInputEmail1">Email</label>
<input type="email" name="email" className="form-control" onChange={onChangeHandlerSU} aria-describedby="emailHelp" placeholder="Your email"/>                 
</div>
<div className="form-group shrink">
<label for="exampleInputPassword1">Password</label>
<input type="password" name="password" className="form-control" onChange={onChangeHandlerSU} placeholder="Your Password"/>
</div>
<button type="submit" onClick={onSubmitHandlerSU} className="btn btn-primary">Submit</button>
</form>
</div>
<br/>

<div className="box">
<form>
<p><b>Login</b></p><hr/>
<div className="form-group">
<label for="exampleInputEmail1">Email</label>
<input type="email" name="email" className="form-control" onChange={onChangeHandlerLG} aria-describedby="emailHelp" placeholder="Your email"/>                 
</div>
<div className="form-group">
<label for="exampleInputPassword1">Password</label>
<input type="password" name="password" className="form-control" onChange={onChangeHandlerLG} placeholder="Your Password"/>
</div>
<button type="submit" onClick={onSubmitHandlerLG} className="btn btn-primary">Submit</button>
</form>
</div>
</div>   */}


//---------------------Signup------------------------------//
// const navigate = useNavigate();
// const [input, setInput] = useState({
//         username: "",
//         email: "",
//         password: ""
// });
// const onChangeHandlerSU = (event)=>{
//         let name= event.target.name;
//         let value= event.target.value;
//         setInput({...input, [name]: value})
        
// };
// const checkingEmptyValidation=(value)=>{
//         if(value){
//           return true;
//         }
//         else {
//           return false;
//         }
//       }
//       const minLengthValidation=(value)=>{
//         if(value.length>3){
//           return true;
//         }
//         else {
//           return false;
//         }
//       }
//       const onSubmitHandlerSU = (event)=>{
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