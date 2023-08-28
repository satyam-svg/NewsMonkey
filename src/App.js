import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function BusinessNews() {
  return <News pagesize={6} country='in' category='business' />;
}

function EntertainmentNews() {
  return <News pagesize={6} country='in' category='entertainment' />;
}

function HealthNews() {
  return <News pagesize={6} country='in' category='health' />;
}
function GeneralNews(){
  return <News pagesize={6} country='in' category='general' />
}
function TechnologyNews(){
  return <News pagesize={6} country='in' category='technology' />
}
function SportsNews() {
  return <News pagesize={6} country='in' category='sports' />
}
function ScienceNews(){
  return <News pagesize={6} country='in' category='science' />
}

// Define similar components for other categories

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/business" element={<BusinessNews />} />
        <Route path="/entertainment" element={<EntertainmentNews />} />
        <Route path="/health" element={<HealthNews />} />
        <Route path="/general" element={<GeneralNews />} />
        <Route path="/technology" element={<TechnologyNews />} />
        <Route path="/sports" element={<SportsNews />} />
        <Route path="/science" element={<ScienceNews />} />
        
      </Routes>
    </Router>
  );
}

export default App;
