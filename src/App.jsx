import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import PostJob from './pages/PostJob/PostJob';
import FindWorkers from './pages/FindWorkers/FindWorkers';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Achievements from './pages/Achievements/Achievements';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
              </>
            } />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/find-workers" element={<FindWorkers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
