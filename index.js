 
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import  cors from 'cors'
import postRoutes from './routes/posts.js'



const app = express()

app.use(express.json())
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors())

app.get('/',(req,res)=>{
    const name = 'Babar'
    res.send(`Hello ${name}`)
    
})



// express body parser 

app.use('/uploads', express.static('uploads'));

app.use('/api/posts',postRoutes );



// mongodb atlast
const CONNECTION_URL = 'mongodb://blog:blog123@blog-shard-00-00.7qsih.mongodb.net:27017,blog-shard-00-01.7qsih.mongodb.net:27017,blog-shard-00-02.7qsih.mongodb.net:27017/?ssl=true&replicaSet=atlas-437w11-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog';


const PORT = process.env.PORT || 5000



mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

