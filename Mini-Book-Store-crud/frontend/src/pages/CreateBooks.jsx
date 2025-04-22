import { useState } from "react"
import Spinner from '../components/Spinner';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateBooks = () => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [publishYear, setpublishYear] = useState( '')
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();
  const handleSubmit =  () => {
    const data ={
      title,
      author,
      publishYear
    };
    setloading(false);
    axios.post('http://localhost:3000/api/books/addBook', data)
    .then(()=>{
      setloading(true);
      navigate('/');
    }).catch((error)=>{
      setloading(false);
      console.log(error);
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input type="text" value={title} onChange={(e)=>settitle(e.target.value)} className="border-2 border-gray-50 px-4 py-2 w-full" />
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input type="text" value={author} onChange={(e)=>setauthor(e.target.value)} className="border-2 border-gray-50 px-4 py-2 w-full" />
          <label className="text-xl mr-4 text-gray-500">Published Year</label>
          <input type="text" value={publishYear} onChange={(e)=>setpublishYear(e.target.value)} className="border-2 border-gray-50 px-4 py-2 w-full" />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default CreateBooks