import Header from './components/Header';
import Card from './components/card';
import { Routes, Route } from 'react-router-dom';
import Addmovies from './components/Addmovies';
import Detail from './components/Detail';
import { createContext, useContext, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUsername] = useState('');

  return (
    <Appstate.Provider value={{ login, setLogin, userName, setUsername }}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/add" element={<Addmovies />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}
