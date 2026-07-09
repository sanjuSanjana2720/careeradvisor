import { streamDescriptions } from '../data/quizQuestions';
import { courses } from '../data/courses';
import { colleges } from '../data/colleges';

export function calculateQuizResults(answers) {
    const scores = { arts: 0, science: 0, commerce: 0, vocational: 0 };
    const maxPossible = answers.length * 3;

    answers.forEach((answer) => {
        if (answer && answer.streams) {
            Object.keys(answer.streams).forEach((stream) => {
                scores[stream] += answer.streams[stream];
            });
        }
    });

    const percentages = {};
    Object.keys(scores).forEach((stream) => {
        percentages[stream] = Math.round((scores[stream] / maxPossible) * 100);
    });

    const sortedStreams = Object.entries(percentages)
        .sort(([, a], [, b]) => b - a)
        .map(([stream, percentage]) => ({
            stream,
            percentage,
            ...streamDescriptions[stream],
        }));

    return { scores, percentages, sortedStreams };
}

export function getRecommendedCourses(quizResults, profile = {}) {
    if (!quizResults || !quizResults.sortedStreams) return [];

    const topStreams = quizResults.sortedStreams.slice(0, 2).map((s) => s.stream);

    // Determine the relevant education level based on current class
    let targetLevel = 'undergraduate';
    if (profile.currentClass === '10th') {
        targetLevel = 'intermediate';
    } else if (profile.currentClass === 'Graduate') {
        targetLevel = 'postgraduate';
    } else {
        targetLevel = 'undergraduate';
    }

    const recommended = courses
        .filter((course) => topStreams.includes(course.stream) && course.level === targetLevel)
        .map((course) => {
            let score = 0;
            const streamIndex = topStreams.indexOf(course.stream);
            score += streamIndex === 0 ? 40 : 20;

            if (quizResults.percentages[course.stream]) {
                score += quizResults.percentages[course.stream] * 0.3;
            }

            if (profile.interests && profile.interests.length > 0) {
                const matchingSubjects = course.subjects.filter((subj) =>
                    profile.interests.some(
                        (int) => subj.toLowerCase().includes(int.toLowerCase()) || int.toLowerCase().includes(subj.toLowerCase())
                    )
                );
                score += matchingSubjects.length * 10;
            }

            return { ...course, matchScore: Math.min(Math.round(score), 99) };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

    return recommended;
}

export function getRecommendedColleges(profile = {}) {
    let filtered = [...colleges];

    // Determine the relevant education level based on current class
    let targetLevel = 'undergraduate';
    if (profile.currentClass === '10th') {
        targetLevel = 'intermediate';
    } else if (profile.currentClass === 'Graduate') {
        targetLevel = 'postgraduate';
    } else {
        targetLevel = 'undergraduate';
    }

    // Filter by level first
    filtered = filtered.filter((c) => c.level === targetLevel);

    if (profile.state && profile.state !== 'All States') {
        const stateColleges = filtered.filter((c) => c.state === profile.state);
        if (stateColleges.length > 0) {
            filtered = stateColleges;
        }
    }

    return filtered
        .map((college) => {
            let score = college.rating * 10;
            score += college.facilities.length * 3;
            if (profile.state && college.state === profile.state) score += 20;

            // Boost if the college offers courses matching user interests (simple check)
            if (profile.interests && profile.interests.length > 0) {
                const hasMatchingCourse = college.courses.some(course =>
                    profile.interests.some(interest => course.includes(interest))
                );
                if (hasMatchingCourse) score += 15;
            }

            return { ...college, matchScore: Math.min(Math.round(score), 99) };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
}

export function getCareerPaths(quizResults) {
    if (!quizResults || !quizResults.sortedStreams) return [];

    const topStream = quizResults.sortedStreams[0];
    if (!topStream) return [];

    const relevantCourses = courses.filter((c) => c.stream === topStream.stream);
    const careers = [];

    relevantCourses.forEach((course) => {
        course.careers.forEach((career) => {
            if (!careers.find((c) => c.title === career.title)) {
                careers.push({ ...career, fromDegree: course.name });
            }
        });
    });

    return careers;
}
