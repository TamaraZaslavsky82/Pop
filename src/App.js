
import CommentForm from './Components/Home/CommentForm/CommentForm';
import Home from './Components/Home/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/comentarios' element={<CommentForm/>}/>
      </Routes>
   

</div>
  );
}

export default App;
