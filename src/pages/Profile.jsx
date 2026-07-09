import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { states } from '../data/colleges';
import { getRecommendedCourses, getRecommendedColleges, getCareerPaths } from '../utils/recommendationEngine';

const interestOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History',
    'Political Science', 'Economics', 'English Literature', 'Computer Science',
    'Psychology', 'Business', 'Art & Design', 'Music', 'Sports',
    'Law', 'Medicine', 'Engineering', 'Teaching', 'Writing',
];

export default function Profile() {
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            name: '', age: '', gender: '', currentClass: '', state: '', interests: [],
        };
    });

    const [quizResults, setQuizResults] = useState(() => {
        const saved = localStorage.getItem('quizResults');
        return saved ? JSON.parse(saved) : null;
    });

    const [recommendations, setRecommendations] = useState({
        courses: [], colleges: [], careers: [],
    });

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        if (quizResults) {
            const courses = getRecommendedCourses(quizResults, profile);
            const colleges = getRecommendedColleges(profile);
            const careers = getCareerPaths(quizResults);
            setRecommendations({ courses, colleges, careers });
        }
    }, [quizResults, profile]);

    const updateProfile = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const toggleInterest = (interest) => {
        setProfile((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout? This will clear your profile and quiz results.')) {
            localStorage.removeItem('userProfile');
            localStorage.removeItem('quizResults');
            localStorage.removeItem('collegeShortlist');
            setProfile({ name: '', age: '', gender: '', currentClass: '', state: '', interests: [] });
            setQuizResults(null);
            window.dispatchEvent(new Event('storage'));
            navigate('/');
        }
    };

    return (
        <div className="profile-container fade-in">
            <div className="page-header" style={{ padding: '120px 0 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                    <h1 className="section-title" style={{ marginBottom: 0 }}>My Profile</h1>
                    <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                        Logout
                    </button>
                </div>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Set up your profile for personalized course, college, and career recommendations.
                </p>
            </div>

            {/* Profile Form */}
            <div className="glass-card profile-form-card">
                <h2 style={{ fontSize: '1.3rem', marginBottom: '24px' }}>👤 Student Details</h2>

                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter your name"
                            value={profile.name}
                            onChange={(e) => updateProfile('name', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Your age"
                            min="14"
                            max="30"
                            value={profile.age}
                            onChange={(e) => updateProfile('age', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            value={profile.gender}
                            onChange={(e) => updateProfile('gender', e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Current Class</label>
                        <select
                            className="form-select"
                            value={profile.currentClass}
                            onChange={(e) => updateProfile('currentClass', e.target.value)}
                        >
                            <option value="">Select Class</option>
                            <option value="10th">Class 10th</option>
                            <option value="11th">Class 11th</option>
                            <option value="12th">Class 12th</option>
                            <option value="12th Pass">12th Pass</option>
                            <option value="Graduate">Already Graduated</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">State / Location</label>
                        <select
                            className="form-select"
                            value={profile.state}
                            onChange={(e) => updateProfile('state', e.target.value)}
                        >
                            <option value="">Select your state</option>
                            {states.filter((s) => s !== 'All States').map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">Academic Interests (select all that apply)</label>
                        <div className="interest-chips">
                            {interestOptions.map((interest) => (
                                <button
                                    key={interest}
                                    className={`interest-chip ${profile.interests.includes(interest) ? 'selected' : ''}`}
                                    onClick={() => toggleInterest(interest)}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard */}
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📊 Your Dashboard</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
                {quizResults
                    ? 'Based on your quiz results and profile, here are your personalized insights.'
                    : 'Complete the aptitude quiz to unlock personalized recommendations.'}
            </p>

            <div className="dashboard-grid">
                <div className="glass-card dashboard-card">
                    <div className="dashboard-card-icon">🎯</div>
                    <h3>{quizResults ? `${quizResults.sortedStreams[0]?.percentage || 0}%` : '—'}</h3>
                    <p>Top Stream Match</p>
                    {quizResults && <p style={{ color: 'var(--accent-blue)', fontWeight: 600, marginTop: '4px' }}>{quizResults.sortedStreams[0]?.name}</p>}
                </div>

                <div className="glass-card dashboard-card">
                    <div className="dashboard-card-icon">📚</div>
                    <h3>{recommendations.courses.length}</h3>
                    <p>Recommended Courses</p>
                </div>

                <div className="glass-card dashboard-card">
                    <div className="dashboard-card-icon">🏛️</div>
                    <h3>{recommendations.colleges.length}</h3>
                    <p>Matching Colleges</p>
                </div>

                <div className="glass-card dashboard-card">
                    <div className="dashboard-card-icon">💼</div>
                    <h3>{recommendations.careers.length}</h3>
                    <p>Career Paths Available</p>
                </div>
            </div>

            {!quizResults && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Link to="/quiz" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
                        🎯 Take the Aptitude Quiz to Get Started
                    </Link>
                </div>
            )}

            {quizResults && recommendations.courses.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>🎯 Recommended Courses for You</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {recommendations.courses.slice(0, 4).map((course) => (
                            <div key={course.id} className="glass-card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div style={{ fontSize: '2rem' }}>{course.icon}</div>
                                    <span className="badge" style={{ background: 'var(--gradient-primary)', color: 'white' }}>{course.matchScore}% Match</span>
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{course.name}</h3>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>⏱️ {course.duration} &bull; {course.eligibility}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Link to="/careers" className="btn btn-secondary">View All Career Paths →</Link>
                    </div>
                </div>
            )}

            {quizResults && recommendations.colleges.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>🏛️ Colleges Matched for You</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {recommendations.colleges.slice(0, 4).map((college) => (
                            <div key={college.id} className="glass-card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div className="college-rating">⭐ {college.rating}</div>
                                    <span className="badge" style={{ background: 'var(--gradient-secondary)', color: 'white' }}>{college.matchScore}% Match</span>
                                </div>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>{college.name}</h3>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>📍 {college.district}, {college.state}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Link to="/colleges" className="btn btn-secondary">Browse All Colleges →</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
