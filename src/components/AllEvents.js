import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {url} from '../App';
import {Link} from 'react-router-dom';
function AllEvents() {
  

  let [data,setData] = useState([]);


  let getData = async()=>{
    let res = await axios.get(`${url}/events`)
    if(res.data.statusCode===200)
    {
      setData(res.data.data)
    }
    {
      console.log(res.data.message)
    }
  }

  useEffect(()=>{
    getData();
  },[])

  let handleChange = async(id,status)=>{
    let updateStatus = status==='Y'?'N':'Y';
    let res = await axios.put(`${url}/status`,
    { 
        id:id,
        status:updateStatus
    })

    if(res.data.statusCode===200)
    {
      getData();
    }
    else
    {
      console.log(res.data.message)
    }
  }

  return (
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Event Name</th>
      <th>Location</th>
      <th>Date</th>
      <th>Last Date for Reg</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      data.map((e,i)=>{
        return <tr key={e._id}>
          <td>
            <Link to = {`/event-details/${e._id}`}>
            {i+1}
            </Link>
          </td>
          <td>{e.eventName}</td>
          <td>{e.location}</td>
          <td>{e.eventDate}</td>
          <td>{e.regClose}</td>
          <td>{
              e.status==='Y'?<>
              <Button variant="danger" onClick={()=>handleChange(e._id,e.status)}>Close</Button>
              </>:
              <>
              <Button variant="success" onClick={()=>handleChange(e._id,e.status)}>Accept</Button>
              </>
            }</td>
        </tr>
      })
    }
  </tbody>
</Table>
  )
}

export default AllEvents