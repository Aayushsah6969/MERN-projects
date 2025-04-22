import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBooks from './pages/EditBooks'
import DeleteBooks from './pages/DeleteBooks'

function App() {

  return (
    <>
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route exact path="/books/create" element={<CreateBooks />} />
       <Route exact path="/books/details/:id" element={<ShowBook />} />
       <Route exact path="/books/edit/:id" element={<EditBooks />} />
       <Route exact path="/books/delete/:id" element={<DeleteBooks />} />
       {/* <Route path="*" element={<NotFound />} /> */}
     </Routes>
    </>
  )
}

export default App
