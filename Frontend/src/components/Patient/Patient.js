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
              
                axios.get(`http://localhost:4000/patient/${inputlg.mblno}`).then((result)=>{
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
   

        <div className="a_container" >
        <form>
        <h3 className="a_center"><b>Patient Login</b></h3>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Mobile Number</label>
        <input type="number" name="mblno" className="form-control" onChange={onChangeHandlerLG} aria-describedby="emailHelp" placeholder="Mobile Number"/>                 
        </div>
        
        <button type="submit" onClick={onSubmitHandlerLG} className="btn btn-primary">Login</button>
        </form>
        </div>  

</>

)
}
export default Patient;