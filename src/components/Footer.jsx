import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>🎓 EduAdvisor</h3>
                        <p>
                            Your one-stop personalized career & education advisor. Helping students
                            make informed decisions about their future through aptitude assessment,
                            course guidance, and career mapping.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <Link to="/quiz">Aptitude Quiz</Link>
                        <Link to="/careers">Career Paths</Link>
                        <Link to="/colleges">College Directory</Link>
                        <Link to="/timeline">Timeline Tracker</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Resources</h4>
                        <Link to="/resources">Study Materials</Link>
                        <Link to="/resources">Scholarships</Link>
                        <Link to="/resources">E-Books</Link>
                        <Link to="/resources">Skill Courses</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Support</h4>
                        <Link to="/profile">My Profile</Link>
                        <a href="#">Help Center</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Feedback</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 EduAdvisor. Built for students, by innovators. All rights reserved.</p>
                    <div className="footer-social">
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="YouTube">▶</a>
                        <a href="#" aria-label="Instagram">📷</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
