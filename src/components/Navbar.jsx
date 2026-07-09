import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);

        const checkProfile = () => {
            const profile = localStorage.getItem('userProfile');
            if (profile) {
                try {
                    const parsed = JSON.parse(profile);
                    setHasProfile(!!(parsed.name || parsed.interests.length > 0));
                } catch (e) {
                    setHasProfile(false);
                }
            } else {
                setHasProfile(false);
            }
        };

        checkProfile();
        window.addEventListener('storage', checkProfile);
        return () => window.removeEventListener('storage', checkProfile);
    }, [location]);

    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout? This will clear your profile and quiz results.')) {
            localStorage.removeItem('userProfile');
            localStorage.removeItem('quizResults');
            localStorage.removeItem('collegeShortlist');
            setHasProfile(false);
            window.dispatchEvent(new Event('storage'));
            navigate('/');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="nav-logo">
                    <div className="nav-logo-icon">🎓</div>
                    <span>EduAdvisor</span>
                </Link>

                <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
                    <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/quiz" className={isActive('/quiz') ? 'active' : ''}>Aptitude Quiz</Link></li>
                    <li><Link to="/careers" className={isActive('/careers') ? 'active' : ''}>Career Paths</Link></li>
                    <li><Link to="/colleges" className={isActive('/colleges') ? 'active' : ''}>Colleges</Link></li>
                    <li><Link to="/timeline" className={isActive('/timeline') ? 'active' : ''}>Timeline</Link></li>
                    <li><Link to="/resources" className={isActive('/resources') ? 'active' : ''}>Resources</Link></li>
                    <li><Link to="/profile" className={`nav-cta ${isActive('/profile') ? '' : ''}`}>My Profile</Link></li>
                    {hasProfile && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="btn btn-danger"
                                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>

                <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
