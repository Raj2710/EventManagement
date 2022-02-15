import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {url} from '../App';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Register() {

  let [events,setEvents]=useState([]);
  let [event,setEvent] = useState("")
  let [name,setName] = useState("");
  let [roll,setRoll] = useState("");
  let [dept,setDept] = useState("");
  let [year,setYear] = useState("");
  let [email,setEmail] = useState("");
  let navigate = useNavigate();

  let getEvents = async()=>{
    let res = await axios.get(`${url}/events`);
    if(res.data.statusCode===200)
    {
      setEvents(res.data.data);
    }
    else{
      console.log(res.data.message)
    }
  }

  useEffect(()=>{
    getEvents();
  },[])
  
  let handleSubmit = async()=>{
    let reqBody = {
      name,
      roll,
      dept,
      year,
      email,
      event_id:event,
      regDate:new Date().toISOString(),
      status:'Pending'

    }
    let res = await axios.post(`${url}/register`,reqBody)
    if(res.data.statusCode===200)
    {
      navigate('/');
    }
    else
    {
      console.log(res.data.message)
    }
  }

  let handleChange = (e)=>{
    setEvent(e.target.value)
  }

  return <>
        <Form style={{"marginLeft":"100px","marginRight":"100px"}}>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Event</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={event}
                label="Event"
                onChange={handleChange}
              >
                {
                  events.map((e)=>{
                    return <MenuItem value={e._id} key={e._id}>{e.eventName}</MenuItem>
                  })
                }
              </Select>
            </FormControl>


          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Roll Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Roll Number" onChange={(e)=>setRoll(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" placeholder="Enter Department" onChange={(e)=>setDept(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" placeholder="Enter Year" onChange={(e)=>setYear(e.target.value)}/>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" onClick={()=>handleSubmit()}>
            Submit
          </Button>
        </Form>
  </>
}

export default Register