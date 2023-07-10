import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Doctor.css";

function Doctor(){


//---------------------Login------------------------//
        const navigate = useNavigate();
        const [inputlg, setInputlg] = useState({
                
        });
        const onChangeHandlerLG = (event)=>{
                let name= event.target.name;
                let value= event.target.value;
                setInputlg({...inputlg, [name]: value})
                console.log(inputlg);
        
        };
        const checkingEmptyValidation=(value)=>{
                if(value){
                return true;
                }
                else {
                return false;
                }
        };
        const onSubmitHandlerLG = (event)=>{
                event.preventDefault();
                if(!checkingEmptyValidation(inputlg.doctoremail)){
                        alert("Email cannot be empty");
                        return;
                }
                axios.get(`http://localhost:3000/medregistrationdoctor?doctoremail=${inputlg.doctoremail}`).then((result)=>{
                if(result.data && result.data.length>0){
                        sessionStorage.setItem("doctoremail", inputlg.doctoremail);
                        sessionStorage.setItem("LS", "true");
                        navigate("/dp");
                } 
                else{
                        alert("Email not matching");
                }
                }).catch((error)=>{
                        console.log(error);
                });
        };


return(<>
   

<div className="container" >

        <div className="box">
        <form>
        <p><b>Doctor Login</b></p><hr/>
        <div className="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" name="doctoremail" className="form-control" onChange={onChangeHandlerLG} aria-describedby="emailHelp" placeholder="Your email"/>                 
        </div>
        <button type="submit" onClick={onSubmitHandlerLG} className="btn btn-primary">Submit</button>
        </form>
        </div>
</div>  

</>

)}
export default Doctor;