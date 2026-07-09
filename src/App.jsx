import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AptitudeQuiz from './pages/AptitudeQuiz';
import CareerMapping from './pages/CareerMapping';
import CollegeDirectory from './pages/CollegeDirectory';
import TimelineTracker from './pages/TimelineTracker';
import Profile from './pages/Profile';
import Resources from './pages/Resources';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<AptitudeQuiz />} />
          <Route path="/careers" element={<CareerMapping />} />
          <Route path="/colleges" element={<CollegeDirectory />} />
          <Route path="/timeline" element={<TimelineTracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
