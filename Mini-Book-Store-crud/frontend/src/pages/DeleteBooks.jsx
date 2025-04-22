import { useState } from "react"
import Spinner from '../components/Spinner';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const DeleteBooks = () => {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();
  const {id} =useParams();
  const handleDeleteBooks = ()=>{
    setloading(true)
    axios.delete(`http://localhost:3000/api/books/deleteBook/${id}`)
     .then(() => {
        navigate('/')
        setloading(false)
      })
     .catch((err) => {
        console.log(err)
        setloading(false)
      })
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4"> Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700" onClick={handleDeleteBooks}>Delete Book</button>
    </div>
  )
}

export default DeleteBooks