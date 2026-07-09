export default function Resources() {
    const resources = [
        {
            category: 'E-Books & Study Materials',
            icon: '📖',
            description: 'Free and open-source study materials curated for various streams and subjects.',
            items: [
                { name: 'NCERT Textbooks (All Classes)', url: 'https://ncert.nic.in/textbook.php', type: 'Free' },
                { name: 'NIOS Study Materials', url: 'https://nios.ac.in', type: 'Free' },
                { name: 'NPTEL Video Courses (IIT)', url: 'https://nptel.ac.in', type: 'Free' },
                { name: 'SWAYAM Online Courses', url: 'https://swayam.gov.in', type: 'Free' },
                { name: 'National Digital Library', url: 'https://ndl.iitkgp.ac.in', type: 'Free' },
            ],
        },
        {
            category: 'Scholarships',
            icon: '🎓',
            description: 'Central and state government scholarships to fund your education journey.',
            items: [
                { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in', type: 'Government' },
                { name: 'PM Vidyalaxmi (Education Loan)', url: '#', type: 'Government' },
                { name: 'Central Sector Scholarship (MHRD)', url: '#', type: 'Merit-Based' },
                { name: 'Pragati Scholarship for Girls (AICTE)', url: '#', type: 'For Girls' },
                { name: 'Post-Matric Scholarship for SC/ST/OBC', url: '#', type: 'Category-Based' },
            ],
        },
        {
            category: 'Skill Development',
            icon: '💡',
            description: 'Free government-backed skill courses to boost your employability.',
            items: [
                { name: 'Skill India Digital Hub', url: 'https://www.skillindia.gov.in', type: 'Free' },
                { name: 'PMKVY Courses (Kaushal Vikas)', url: '#', type: 'Free + Certificate' },
                { name: 'DigiLocker (Digital Documents)', url: 'https://digilocker.gov.in', type: 'Utility' },
                { name: 'eSkill India (NSDC)', url: '#', type: 'Free Courses' },
                { name: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com', type: 'Free' },
            ],
        },
        {
            category: 'Government Exam Preparation',
            icon: '📝',
            description: 'Resources to prepare for competitive exams and government job tests.',
            items: [
                { name: 'UPSC Official Website', url: 'https://upsc.gov.in', type: 'Official' },
                { name: 'SSC Official Portal', url: 'https://ssc.nic.in', type: 'Official' },
                { name: 'IBPS Banking Exams', url: 'https://ibps.in', type: 'Official' },
                { name: 'NTA Exam Portal (JEE/NEET/CUET)', url: 'https://nta.ac.in', type: 'Official' },
                { name: 'Previous Year Question Papers', url: '#', type: 'Study Material' },
            ],
        },
        {
            category: 'Career Guidance Portals',
            icon: '🧭',
            description: 'Government and trusted portals for career counseling and information.',
            items: [
                { name: 'National Career Service (NCS)', url: 'https://www.ncs.gov.in', type: 'Government' },
                { name: 'My Gov India — Youth Portal', url: 'https://www.mygov.in', type: 'Government' },
                { name: 'UGC Official Website', url: 'https://www.ugc.gov.in', type: 'Official' },
                { name: 'AICTE Approved Institutions List', url: 'https://www.aicte-india.org', type: 'Official' },
                { name: 'Samagra Shiksha Portal', url: '#', type: 'Government' },
            ],
        },
        {
            category: 'Language & Communication',
            icon: '🗣️',
            description: 'Improve English and communication skills with free resources.',
            items: [
                { name: 'British Council — Learn English', url: 'https://learnenglish.britishcouncil.org', type: 'Free' },
                { name: 'Duolingo (Language Learning)', url: 'https://www.duolingo.com', type: 'Free' },
                { name: 'Coursera — Communication Skills', url: 'https://www.coursera.org', type: 'Free (Audit)' },
                { name: 'Khan Academy India', url: 'https://www.khanacademy.org', type: 'Free' },
            ],
        },
    ];

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <h1 className="section-title">Study Resources & Scholarships</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Access free e-books, scholarship portals, skill development courses, and career guidance resources — all in one place.
                    </p>
                </div>
            </div>

            <div className="container section" style={{ paddingTop: 0 }}>
                <div className="resources-grid">
                    {resources.map((resource) => (
                        <div key={resource.category} className="glass-card resource-card fade-in">
                            <div className="resource-card-icon">{resource.icon}</div>
                            <h3>{resource.category}</h3>
                            <p>{resource.description}</p>
                            <div className="resource-links">
                                {resource.items.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.url}
                                        className="resource-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span style={{ flex: 1 }}>{item.name}</span>
                                        <span className="badge" style={{
                                            background: item.type === 'Free' ? 'rgba(16, 185, 129, 0.15)' :
                                                item.type === 'Government' ? 'rgba(59, 130, 246, 0.15)' :
                                                    item.type === 'Official' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                                            color: item.type === 'Free' ? '#10b981' :
                                                item.type === 'Government' ? '#3b82f6' :
                                                    item.type === 'Official' ? '#f59e0b' : '#a855f7',
                                            fontSize: '0.68rem',
                                        }}>
                                            {item.type}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
