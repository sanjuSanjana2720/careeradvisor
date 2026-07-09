import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';
import { quizQuestions, streamDescriptions } from '../data/quizQuestions';
import { calculateQuizResults } from '../utils/recommendationEngine';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function AptitudeQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    const handleSelect = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentQ] = option;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQ < quizQuestions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            const res = calculateQuizResults(answers);
            setResults(res);
            setShowResults(true);
            localStorage.setItem('quizResults', JSON.stringify(res));
        }
    };

    const handlePrev = () => {
        if (currentQ > 0) setCurrentQ(currentQ - 1);
    };

    const handleRetake = () => {
        setCurrentQ(0);
        setAnswers(Array(quizQuestions.length).fill(null));
        setShowResults(false);
        setResults(null);
    };

    if (showResults && results) {
        const chartData = {
            labels: results.sortedStreams.map((s) => s.name),
            datasets: [
                {
                    label: 'Match %',
                    data: results.sortedStreams.map((s) => s.percentage),
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    pointBackgroundColor: results.sortedStreams.map((s) => s.color),
                    pointBorderColor: results.sortedStreams.map((s) => s.color),
                    pointRadius: 6,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: '#64748b',
                        backdropColor: 'transparent',
                        font: { size: 11 },
                    },
                    pointLabels: {
                        color: '#f1f5f9',
                        font: { size: 13, weight: '600', family: 'Outfit' },
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.08)',
                    },
                    angleLines: {
                        color: 'rgba(255,255,255,0.08)',
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.raw}% match`,
                    },
                },
            },
        };

        return (
            <div className="quiz-results fade-in">
                <div className="results-header">
                    <h1 className="section-title">Your Results Are In! 🎉</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Based on your answers, here's how your interests and strengths align with different academic streams.
                    </p>
                </div>

                <div className="results-chart-container">
                    <div className="results-chart">
                        <Radar data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="stream-results">
                    {results.sortedStreams.map((stream, i) => (
                        <div key={stream.stream} className="glass-card stream-result-card" style={{ position: 'relative' }}>
                            {i === 0 && <div className="recommended-badge">⭐ Best Match</div>}
                            <div className="stream-result-header">
                                <div className="stream-result-icon">{stream.icon}</div>
                                <div className="stream-result-info">
                                    <h3>{stream.name}</h3>
                                    <div className="percentage" style={{ color: stream.color }}>{stream.percentage}%</div>
                                </div>
                            </div>
                            <p className="stream-result-desc">{stream.description}</p>
                            <div className="stream-degrees">
                                <h4>Recommended Degrees</h4>
                                <div className="stream-tags">
                                    {stream.degrees.map((d) => (
                                        <span key={d} className="stream-tag">{d}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="stream-careers">
                                <h4>Top Careers</h4>
                                <div className="stream-tags">
                                    {stream.careers.map((c) => (
                                        <span key={c} className="stream-tag">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={handleRetake} className="btn btn-secondary">🔄 Retake Quiz</button>
                    <Link to="/careers" className="btn btn-primary">📊 Explore Career Paths</Link>
                    <Link to="/colleges" className="btn btn-secondary">🏛️ Find Colleges</Link>
                </div>
            </div>
        );
    }

    const question = quizQuestions[currentQ];
    const progress = ((currentQ + 1) / quizQuestions.length) * 100;

    const categoryLabels = {
        interest: { label: 'Interest', bg: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' },
        personality: { label: 'Personality', bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
        academic: { label: 'Academic Strength', bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
    };

    const cat = categoryLabels[question.category] || categoryLabels.interest;

    return (
        <div className="quiz-container fade-in">
            <div className="quiz-progress">
                <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="quiz-progress-text">
                    <span>Question {currentQ + 1} of {quizQuestions.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
            </div>

            <div className="glass-card quiz-question-card slide-in" key={currentQ}>
                <span className="quiz-category" style={{ background: cat.bg, color: cat.color }}>
                    {cat.label}
                </span>
                <h2>{question.question}</h2>

                <div className="quiz-options">
                    {question.options.map((opt, i) => (
                        <button
                            key={i}
                            className={`quiz-option ${answers[currentQ] === opt ? 'selected' : ''}`}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
            </div>

            <div className="quiz-nav">
                <button
                    className="btn btn-secondary"
                    onClick={handlePrev}
                    disabled={currentQ === 0}
                    style={{ opacity: currentQ === 0 ? 0.4 : 1 }}
                >
                    ← Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!answers[currentQ]}
                    style={{ opacity: !answers[currentQ] ? 0.5 : 1 }}
                >
                    {currentQ === quizQuestions.length - 1 ? '🎯 See Results' : 'Next →'}
                </button>
            </div>
        </div>
    );
}
