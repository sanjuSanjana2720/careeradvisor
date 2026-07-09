import { useState } from 'react';
import { courses } from '../data/courses';

export default function CareerMapping() {
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [filterStream, setFilterStream] = useState('all');
    const [filterLevel, setFilterLevel] = useState('all');

    const filtered = courses.filter((c) => {
        const matchStream = filterStream === 'all' || c.stream === filterStream;
        const matchLevel = filterLevel === 'all' || c.level === filterLevel;
        return matchStream && matchLevel;
    });

    const streamColors = {
        arts: { bg: 'rgba(168, 85, 247, 0.12)', border: '#a855f7', text: '#a855f7' },
        science: { bg: 'rgba(59, 130, 246, 0.12)', border: '#3b82f6', text: '#3b82f6' },
        commerce: { bg: 'rgba(245, 158, 11, 0.12)', border: '#f59e0b', text: '#f59e0b' },
        vocational: { bg: 'rgba(16, 185, 129, 0.12)', border: '#10b981', text: '#10b981' },
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1 className="section-title">Course-to-Career Path Mapping</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Explore what each degree offers — career opportunities, salary ranges, government exams, and higher education paths.
                    </p>
                </div>
            </div>

            <div className="container section" style={{ paddingTop: 0 }}>
                <div className="timeline-filters" style={{ marginBottom: '16px' }}>
                    {['all', 'arts', 'science', 'commerce', 'vocational'].map((stream) => (
                        <button
                            key={stream}
                            className={`timeline-filter-btn ${filterStream === stream ? 'active' : ''}`}
                            onClick={() => setFilterStream(stream)}
                        >
                            {stream === 'all' ? '📋 All Streams' :
                                stream === 'arts' ? '🎨 Arts' :
                                    stream === 'science' ? '🔬 Science' :
                                        stream === 'commerce' ? '📊 Commerce' : '🛠️ Vocational'}
                        </button>
                    ))}
                </div>

                <div className="timeline-filters">
                    {['all', 'intermediate', 'undergraduate', 'postgraduate'].map((level) => (
                        <button
                            key={level}
                            className={`timeline-filter-btn ${filterLevel === level ? 'active' : ''}`}
                            onClick={() => setFilterLevel(level)}
                            style={{ fontSize: '0.85rem', padding: '6px 16px' }}
                        >
                            {level === 'all' ? '🎓 All Levels' :
                                level === 'intermediate' ? '🏫 After 10th' :
                                    level === 'undergraduate' ? '🎓 After 12th / UG' : '🎓 Graduate / PG'}
                        </button>
                    ))}
                </div>

                <div className="career-grid">
                    {filtered.map((course) => {
                        const sc = streamColors[course.stream];
                        const isExpanded = expandedCourse === course.id;

                        return (
                            <div key={course.id} className="glass-card course-card fade-in">
                                <div className="course-card-header">
                                    <div className="course-icon">{course.icon}</div>
                                    <div className="course-meta">
                                        <h3>{course.name}</h3>
                                        <div className="course-meta-tags">
                                            <span className="course-meta-tag" style={{ background: sc.bg, color: sc.text }}>
                                                {course.stream.charAt(0).toUpperCase() + course.stream.slice(1)}
                                            </span>
                                            <span className="course-meta-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                                                ⏱️ {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="course-description">{course.description}</p>

                                <div className="course-section">
                                    <h4>📋 Eligibility</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{course.eligibility}</p>
                                </div>

                                <div className="course-section">
                                    <h4>💼 Career Opportunities</h4>
                                    <div className="career-list">
                                        {course.careers.slice(0, isExpanded ? course.careers.length : 3).map((career) => (
                                            <div key={career.title} className="career-item">
                                                <div className="career-item-info">
                                                    <span className="career-item-title">{career.title}</span>
                                                    <span className="career-item-sector">{career.sector} • Growth: {career.growth}</span>
                                                </div>
                                                <span className="career-item-salary">{career.avgSalary}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {isExpanded && (
                                    <>
                                        <div className="course-section slide-in">
                                            <h4>📝 Government Exams Eligible</h4>
                                            <div className="stream-tags">
                                                {course.govExams.map((exam) => (
                                                    <span key={exam} className="stream-tag">{exam}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="course-section slide-in">
                                            <h4>🎓 Higher Studies Options</h4>
                                            <div className="stream-tags">
                                                {course.higherStudies.map((hs) => (
                                                    <span key={hs} className="stream-tag">{hs}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="course-section slide-in">
                                            <h4>📚 Key Subjects</h4>
                                            <div className="stream-tags">
                                                {course.subjects.map((s) => (
                                                    <span key={s} className="stream-tag">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                <button
                                    className="course-toggle"
                                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                                >
                                    {isExpanded ? '▲ Show Less' : '▼ View Full Career Path'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
