import {Routes, Route} from 'react-router-dom';
import Category from '../../Pages/Category/Category';
import Home from '../../Pages/Home/Home';

function AppRoutes(){
    return(
     <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/:CategoryId' element={<Category/>}></Route>
    </Routes>
    )
}
export default AppRoutes;