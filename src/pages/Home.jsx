import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">🚀 AI-Powered Career Guidance</div>
                        <h1>
                            Your Future,<br />
                            <span className="gradient-text">Your Choice,</span><br />
                            Our Guidance.
                        </h1>
                        <p>
                            Don't let confusion hold you back. Discover your ideal career path,
                            find the right degree, and explore government colleges near you — all
                            personalized to your strengths and interests.
                        </p>
                        <div className="hero-btns">
                            <Link to="/quiz" className="btn btn-primary">
                                🎯 Take Aptitude Quiz
                            </Link>
                            <Link to="/careers" className="btn btn-secondary">
                                📊 Explore Careers
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <h4>15+</h4>
                                <p>Career Streams</p>
                            </div>
                            <div className="hero-stat">
                                <h4>50+</h4>
                                <p>Degree Programs</p>
                            </div>
                            <div className="hero-stat">
                                <h4>100+</h4>
                                <p>Government Colleges</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-cards">
                            <div className="hero-card">
                                <div className="hero-card-icon">🎯</div>
                                <h4>Aptitude Quiz</h4>
                                <p>Discover your ideal stream</p>
                            </div>
                            <div className="hero-card">
                                <div className="hero-card-icon">🗺️</div>
                                <h4>Career Map</h4>
                                <p>Visualize your future</p>
                            </div>
                            <div className="hero-card">
                                <div className="hero-card-icon">🏛️</div>
                                <h4>Find Colleges</h4>
                                <p>Nearby govt. colleges</p>
                            </div>
                            <div className="hero-card">
                                <div className="hero-card-icon">📅</div>
                                <h4>Timeline</h4>
                                <p>Never miss deadlines</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="section-title">Everything You Need in One Place</h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            A comprehensive platform designed to guide students through every
                            step of their educational journey.
                        </p>
                    </div>

                    <div className="features-grid">
                        <Link to="/quiz" className="glass-card feature-card">
                            <div className="feature-icon" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>🧠</div>
                            <h3>Aptitude & Interest Assessment</h3>
                            <p>Take our 15-question quiz to discover which academic stream — Arts, Science, Commerce, or Vocational — best matches your personality, interests, and strengths.</p>
                        </Link>

                        <Link to="/careers" className="glass-card feature-card">
                            <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>🗺️</div>
                            <h3>Course-to-Career Mapping</h3>
                            <p>See detailed career paths for every degree — from B.A. to BCA. Understand job roles, salary ranges, government exams, and growth potential for each course.</p>
                        </Link>

                        <Link to="/colleges" className="glass-card feature-card">
                            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>🏛️</div>
                            <h3>Government College Directory</h3>
                            <p>Browse government colleges across India with details on courses, cut-offs, facilities, medium of instruction, and eligibility — all filterable by state and course.</p>
                        </Link>

                        <Link to="/timeline" className="glass-card feature-card">
                            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>📅</div>
                            <h3>Timeline & Notifications</h3>
                            <p>Stay updated on admission windows, scholarship deadlines, entrance exam dates, and counseling schedules. Never miss an important deadline again.</p>
                        </Link>

                        <Link to="/profile" className="glass-card feature-card">
                            <div className="feature-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>👤</div>
                            <h3>Personalized Profile</h3>
                            <p>Create your student profile and get AI-driven recommendations for courses, colleges, and career paths — all customized to your aptitude, interests, and location.</p>
                        </Link>

                        <Link to="/resources" className="glass-card feature-card">
                            <div className="feature-icon" style={{ background: 'rgba(244, 63, 94, 0.15)' }}>📚</div>
                            <h3>Study Materials & Scholarships</h3>
                            <p>Access curated e-books, skill development courses, scholarship information, and study materials tailored to your chosen stream and subjects.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Four simple steps to your personalized education roadmap
                        </p>
                    </div>

                    <div className="steps-grid">
                        <div className="glass-card step-card">
                            <div className="step-number">1</div>
                            <h4>Create Your Profile</h4>
                            <p>Tell us about your class, interests, and academic background</p>
                        </div>
                        <div className="glass-card step-card">
                            <div className="step-number">2</div>
                            <h4>Take the Quiz</h4>
                            <p>Answer 15 quick questions to reveal your ideal career stream</p>
                        </div>
                        <div className="glass-card step-card">
                            <div className="step-number">3</div>
                            <h4>Explore Options</h4>
                            <p>Browse personalized course, career, and college recommendations</p>
                        </div>
                        <div className="glass-card step-card">
                            <div className="step-number">4</div>
                            <h4>Take Action</h4>
                            <p>Apply for colleges, scholarships, and track important deadlines</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Ready to Discover Your Path?</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
                        Join thousands of students who have already found clarity in their
                        career and education choices. Start your journey today.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/quiz" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
                            🎯 Start Aptitude Quiz — It's Free
                        </Link>
                        <Link to="/colleges" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '14px 36px' }}>
                            🏛️ Browse Colleges
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
