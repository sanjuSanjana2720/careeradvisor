import { useState } from 'react';
import { timelineEvents, categoryColors } from '../data/timeline';

export default function TimelineTracker() {
    const [filter, setFilter] = useState('all');

    const today = new Date().toISOString().split('T')[0];

    const filtered = timelineEvents
        .filter((e) => filter === 'all' || e.category === filter)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const isUpcoming = (endDate) => endDate >= today;
    const isOngoing = (startDate, endDate) => startDate <= today && endDate >= today;

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1 className="section-title">Timeline & Deadline Tracker</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Stay on top of admission windows, scholarship deadlines, and entrance exam schedules. Never miss an important date.
                    </p>
                </div>
            </div>

            <div className="container section" style={{ paddingTop: 0 }}>
                <div className="timeline-filters">
                    <button
                        className={`timeline-filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        📋 All Events
                    </button>
                    <button
                        className={`timeline-filter-btn ${filter === 'entrance' ? 'active' : ''}`}
                        onClick={() => setFilter('entrance')}
                    >
                        📝 Entrance Exams
                    </button>
                    <button
                        className={`timeline-filter-btn ${filter === 'scholarship' ? 'active' : ''}`}
                        onClick={() => setFilter('scholarship')}
                    >
                        🎓 Scholarships
                    </button>
                    <button
                        className={`timeline-filter-btn ${filter === 'admission' ? 'active' : ''}`}
                        onClick={() => setFilter('admission')}
                    >
                        🏛️ Admissions
                    </button>
                </div>

                <div className="timeline-list">
                    {filtered.map((event) => {
                        const catColor = categoryColors[event.category];
                        const upcoming = isUpcoming(event.endDate);
                        const ongoing = isOngoing(event.date, event.endDate);

                        return (
                            <div key={event.id} className="glass-card timeline-item fade-in">
                                <div className="timeline-dot" style={{ borderColor: catColor.border }}></div>

                                {event.important && <span className="important-marker">⚡ Important</span>}

                                <div className="timeline-item-header">
                                    <h3>{event.title}</h3>
                                    <span className="timeline-date">
                                        {formatDate(event.date)}
                                        {event.date !== event.endDate && ` — ${formatDate(event.endDate)}`}
                                    </span>
                                </div>

                                <p>{event.description}</p>

                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px' }}>
                                    <span
                                        className="timeline-badge"
                                        style={{ background: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
                                    >
                                        {catColor.label}
                                    </span>

                                    {ongoing && (
                                        <span className="timeline-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid #10b981' }}>
                                            🟢 Ongoing
                                        </span>
                                    )}
                                    {!upcoming && (
                                        <span className="timeline-badge" style={{ background: 'rgba(100, 116, 139, 0.15)', color: '#64748b', border: '1px solid #64748b' }}>
                                            Expired
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📅</p>
                        <h3 style={{ color: 'var(--text-secondary)' }}>No events found</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
