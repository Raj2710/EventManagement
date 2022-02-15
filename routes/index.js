const e = require('express');
var express = require('express');
var router = express.Router();
const {mongodb,MongoClient,dbUrl} = require('../dbCongig')


router.get('/events',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b30wd');
    let events = await db.collection('events').find().toArray();
    res.json({
      statusCode:200,
      data:events
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})

router.post('/create',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b30wd');
    let event = await db.collection('events').find({eventName:req.body.eventName}).toArray();
    if(event.length==0)
    {
        //DD:MM:YYYY
        let dateFormat = req.body.eventDate.split('-');
        req.body.eventDate = new Date(dateFormat[2],parseInt(dateFormat[1])-1,parseInt(dateFormat[0])+1);
        dateFormat = req.body.regClose.split('-')
        req.body.regClose = new Date(dateFormat[2],parseInt(dateFormat[1])-1,parseInt(dateFormat[0])+1);

        let newEvent = await db.collection('events').insertOne(req.body)
        res.json({
          statusCode:200,
          data:newEvent
        })

    }
    else{
      res.json({
        statusCode:400,
        message:"Event Already Exists"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})

router.put('/status',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b30wd');
    let events = await db.collection('events').updateOne({_id: mongodb.ObjectId(req.body.id)},{$set:{status:req.body.status}})
    res.json({
      statusCode:200,
      data:events
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})


router.post('/register',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b30wd');
    let event = await db.collection('events').find({_id:mongodb.ObjectId(req.body.event_id)}).toArray()
    //console.log(event.length,event[0].status)
    if(event.length>0 && event[0].status=='Y')
    {
        req.body.status = 'Pending'
        let newUser = await db.collection('user').insertOne(req.body)
        res.json({
          statusCode:200,
          message:"User Added Successfully",
          data:newUser
        })
    }
    else
    {
      res.json({
        statusCode:400,
        message:"Event Does Not exists or No longer accepting Registrations"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})


router.get('/users/:event',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b30wd');
    // console.log(req.params.event)
    let events = await db.collection('user').find({event_id:req.params.event}).toArray();
    res.json({
      statusCode:200,
      data:events
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})


router.post('/user-status',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b30wd');
    let event = await db.collection('user').updateOne({_id:mongodb.ObjectId(req.body.user_id)},{$set:{status:req.body.status}})
    res.json({
      statusCode:200,
      message:"Status Changed Successfully"
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error"
    })
  }
})
module.exports = router;



