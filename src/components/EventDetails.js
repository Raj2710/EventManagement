import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import {url} from '../App';
import {useParams} from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
function EventDetails() {

  let [data,setData] = useState([]);
  let params = useParams();

  let getData = async()=>{
    let res = await axios.get(`${url}/users/${params.id}`)
    if(res.data.statusCode===200)
    {
      setData(res.data.data)
    }
    else
    {
      console.log(res.data.message)
    }
  }

  useEffect(()=>{
    getData();
  },[])

  let handleChange = async(id,status)=>{

    let res = await axios.post(`${url}/user-status`,{
      user_id:id,
      status:status
    })
    if(res.data.statusCode===200)
    {
      getData();
    }
    else{
      console.log(res.data.message)
    }
  }
  return <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Roll No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Year of Study</th>
          <th>Date of Reg</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {
            data.map((e,i)=>{
              return <tr key={i}>
                <td>{i+1}</td>
                <td>{e.roll}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.year}</td>
                <td>{e.regDate}</td>
                <td>{e.status}</td>
                <td>
                  {
                    e.status==='Pending'?<>
                      <ThumbUpIcon style={{"color":"#28c930","cursor":"pointer"}} onClick={()=>{handleChange(e._id,'Approved')}}/>
                      &nbsp;
                      &nbsp;
                      <ThumbDownIcon style={{"color":"#9c1c1c","cursor":"pointer"}} onClick={()=>{handleChange(e._id,'Denied')}}/>
                    </>:
                    e.status==='Approved'?<ThumbDownIcon style={{"color":"#9c1c1c","cursor":"pointer"}} onClick={()=>{handleChange(e._id,'Denied')}}/>:
                    e.status==='Denied'?<ThumbUpIcon style={{"color":"#28c930","cursor":"pointer"}} onClick={()=>{handleChange(e._id,'Pending')}}/>:<></>
                  }
                </td>
              </tr>
            })
          }
      </tbody>
  </Table>
  </>
}

export default EventDetails