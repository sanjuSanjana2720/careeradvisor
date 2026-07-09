import { useState } from 'react';
import { colleges, states, facilityIcons } from '../data/colleges';

export default function CollegeDirectory() {
    const [selectedState, setSelectedState] = useState('All States');
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');

    const allCourses = ['All Courses', ...new Set(colleges.flatMap((c) => c.courses))].sort();
    const levels = ['All Levels', 'intermediate', 'undergraduate', 'postgraduate'];

    const filtered = colleges.filter((college) => {
        const matchState = selectedState === 'All States' || college.state === selectedState;
        const matchLevel = selectedLevel === 'All Levels' || college.level === selectedLevel;
        const matchSearch = searchQuery === '' ||
            college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            college.district.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCourse = selectedCourse === 'All Courses' || college.courses.includes(selectedCourse);
        return matchState && matchLevel && matchSearch && matchCourse;
    });

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1 className="section-title">Government College Directory</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Find government degree colleges near you. Filter by state, course, and search by name to discover the right institution.
                    </p>
                </div>
            </div>

            <div className="container section" style={{ paddingTop: 0 }}>
                <div className="college-filters">
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="🔍 Search colleges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="filter-select"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <select
                        className="filter-select"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        {levels.map((level) => {
                            let label = level;
                            if (level === 'All Levels') label = 'All Levels';
                            else if (level === 'intermediate') label = 'After 10th / Intermediate';
                            else if (level === 'undergraduate') label = 'After 12th / Undergraduate';
                            else if (level === 'postgraduate') label = 'Graduate / Postgraduate';
                            
                            return (
                                <option key={level} value={level}>{label}</option>
                            );
                        })}
                    </select>
                    <select
                        className="filter-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {allCourses.map((course) => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>

                <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
                    Showing {filtered.length} college{filtered.length !== 1 ? 's' : ''}
                </p>

                <div className="college-grid">
                    {filtered.map((college) => (
                        <div key={college.id} className="glass-card college-card fade-in">
                            <div className="college-card-header">
                                <div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                                        <span className="badge" style={{ background: 'var(--bg-glass)', color: 'var(--accent-blue)', border: '1px solid var(--border-glass)' }}>
                                            {college.level.toUpperCase()}
                                        </span>
                                        <span className="badge" style={{ background: 'var(--bg-glass)', color: 'var(--accent-purple)', border: '1px solid var(--border-glass)' }}>
                                            {college.type}
                                        </span>
                                    </div>
                                    <h3 className="college-name">{college.name}</h3>
                                    <p className="college-location">📍 {college.district}, {college.state}</p>
                                </div>
                                <div className="college-rating">
                                    ⭐ {college.rating}
                                </div>
                            </div>

                            <div className="college-info-grid">
                                <div className="college-info-item">
                                    <span className="college-info-label">Established</span>
                                    <span className="college-info-value">{college.established}</span>
                                </div>
                                <div className="college-info-item">
                                    <span className="college-info-label">Students</span>
                                    <span className="college-info-value">{college.studentsEnrolled.toLocaleString()}+</span>
                                </div>
                                <div className="college-info-item">
                                    <span className="college-info-label">Cut-off</span>
                                    <span className="college-info-value">{college.cutoff}</span>
                                </div>
                                <div className="college-info-item">
                                    <span className="college-info-label">Medium</span>
                                    <span className="college-info-value">{college.medium.join(', ')}</span>
                                </div>
                            </div>

                            <div className="college-courses">
                                {college.courses.map((course) => (
                                    <span key={course} className="college-course-tag">{course}</span>
                                ))}
                            </div>

                            <div className="college-facilities">
                                {college.facilities.map((f) => {
                                    const info = facilityIcons[f];
                                    return info ? (
                                        <span key={f} className="facility-badge" title={info.label}>
                                            {info.icon} {info.label}
                                        </span>
                                    ) : null;
                                })}
                            </div>

                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                                📧 {college.contact} &nbsp;|&nbsp; 📍 {college.address}
                            </p>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</p>
                            <h3 style={{ color: 'var(--text-secondary)' }}>No colleges found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
