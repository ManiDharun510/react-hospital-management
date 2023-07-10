import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Cmn.css";

function Cmn(){
    const navigate = useNavigate();
    return(<>
    <h1>Hospital Management page</h1><br/>
    <h3>Admin Page</h3>
    <button type="button" className="btn btn-primary" onClick={()=>{navigate('/a')}}>Admin Page</button>
    <br/>
    <br/>
    <h3>Doctor Page</h3>
    <button className="btn btn-primary" onClick={()=>{navigate('/d')}}>Doctor Page</button>
    <br/>
    <br/>
    <h3>Patient Page</h3>
    <button className="btn btn-primary" onClick={()=>{navigate('/p')}}>Patient Page</button>
    
    </>)
}
export default Cmn;