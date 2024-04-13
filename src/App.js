import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongForm from './components/SongForm/SongForm';
import SongCatalog from './components/SongCatalog/SongCatalog';
import SongDetails from './components/SongDetails/SongDetails';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import './styles.css';

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog"
            element={
              <>
                <Header renderHeader={true} /> 
                <SongCatalog />
              </> 
            } />
          <Route path="/song/:id"
            element={
              <>
                <Header renderHeader={true} />
                <SongDetails />
              </>
            } />
          <Route path="/addSong"
            element={
              <>
                <Header renderHeader={true} />
                <SongForm />
              </>
            } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
