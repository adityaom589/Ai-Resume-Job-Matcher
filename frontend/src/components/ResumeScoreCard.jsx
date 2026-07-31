const POSITIVE_REVIEW_TERMS = [
    "strong", "good", "excellent", "clear", "relevant", "well structured",
    "effective", "impressive", "professional", "quantified"
];

const IMPROVEMENT_TERMS = [
    "improve", "add", "include", "missing", "consider", "should", "recommend",
    "quantify", "mention", "highlight"
];

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function splitReview(review = "") {
    return review
        .split(/\n|[•*-]\s+|(?<=[.!?])\s+/)
        .map((item) => item.replace(/^\d+[.)]\s*/, "").trim())
        .filter((item) => item.length > 10);
}

function buildScore(analysis) {
    const skills = analysis.skills || [];
    const review = analysis.aiReview || "";
    const reviewLower = review.toLowerCase();
    const summaryLength = (analysis.summary || "").trim().length;

    const breakdown = {
        skills: clamp(Math.round((skills.length / 10) * 25), 4, 25),
        experience: analysis.experienceYears > 0 ? clamp(12 + analysis.experienceYears * 3, 12, 20) : 10,
        education: analysis.education && analysis.education !== "Not Found" ? 15 : 6,
        profile: analysis.candidateName && analysis.candidateName !== "Unknown" ? 10 : 4,
        summary: summaryLength >= 180 ? 15 : summaryLength >= 90 ? 12 : summaryLength >= 30 ? 8 : 4,
        aiQuality: 8,
    };

    const positiveHits = POSITIVE_REVIEW_TERMS.filter((term) => reviewLower.includes(term)).length;
    const improvementHits = IMPROVEMENT_TERMS.filter((term) => reviewLower.includes(term)).length;
    breakdown.aiQuality = clamp(8 + positiveHits * 2 - Math.min(improvementHits, 4), 4, 15);

    const total = clamp(Object.values(breakdown).reduce((sum, value) => sum + value, 0), 0, 100);
    return { total, breakdown };
}

function getLabel(score) {
    if (score >= 85) return "Excellent foundation";
    if (score >= 70) return "Strong resume";
    if (score >= 55) return "Good start";
    return "Needs improvement";
}

function getTone(score) {
    if (score >= 85) return "excellent";
    if (score >= 70) return "strong";
    if (score >= 55) return "average";
    return "needs-work";
}

function ResumeScoreCard({ analysis }) {
    const { total, breakdown } = buildScore(analysis);
    const reviewItems = splitReview(analysis.aiReview);

    const strengths = reviewItems
        .filter((item) => POSITIVE_REVIEW_TERMS.some((term) => item.toLowerCase().includes(term)))
        .slice(0, 4);

    const suggestions = reviewItems
        .filter((item) => IMPROVEMENT_TERMS.some((term) => item.toLowerCase().includes(term)))
        .slice(0, 5);

    const fallbackStrengths = [
        analysis.skills?.length ? `${analysis.skills.length} relevant technical skills detected` : null,
        analysis.education && analysis.education !== "Not Found" ? `${analysis.education} education identified` : null,
        analysis.summary ? "Resume contains a readable professional summary" : null,
    ].filter(Boolean);

    const fallbackSuggestions = [
        analysis.skills?.length < 6 ? "Add more role-specific technical skills and tools." : null,
        analysis.experienceYears === 0 ? "Add internships, freelance work, or project impact as experience." : null,
        analysis.education === "Not Found" ? "Make the education section easier to identify." : null,
        "Add measurable outcomes such as percentages, users, speed, or time saved.",
    ].filter(Boolean);

    const displayedStrengths = strengths.length ? strengths : fallbackStrengths;
    const displayedSuggestions = suggestions.length ? suggestions : fallbackSuggestions;
    const tone = getTone(total);

    const rows = [
        ["Technical skills", breakdown.skills, 25],
        ["Experience", breakdown.experience, 20],
        ["Education", breakdown.education, 15],
        ["Profile clarity", breakdown.profile, 10],
        ["Summary quality", breakdown.summary, 15],
        ["AI review quality", breakdown.aiQuality, 15],
    ];

    return (
        <section className="dashboard-card resume-score-card">
            <div className="resume-score-header">
                <div>
                    <span className="score-eyebrow">AI RESUME SCORE</span>
                    <h3>Resume readiness overview</h3>
                    <p>An estimated score calculated from the extracted resume details and AI review.</p>
                </div>

                <div className={`score-ring ${tone}`} style={{ "--score": total }}>
                    <div className="score-ring-inner">
                        <strong>{total}</strong>
                        <span>/ 100</span>
                    </div>
                </div>
            </div>

            <div className={`score-status ${tone}`}>
                <strong>{getLabel(total)}</strong>
                <span>{total >= 70 ? "Ready for targeted applications with a few refinements." : "Focus on the suggestions below before applying."}</span>
            </div>

            <div className="score-layout">
                <div className="score-breakdown">
                    <h4>Score breakdown</h4>
                    {rows.map(([label, value, max]) => (
                        <div className="score-row" key={label}>
                            <div className="score-row-label">
                                <span>{label}</span>
                                <strong>{value}/{max}</strong>
                            </div>
                            <div className="score-progress" aria-label={`${label}: ${value} out of ${max}`}>
                                <span style={{ width: `${(value / max) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="score-insights">
                    <div className="score-insight-box strength-box">
                        <h4>✓ Strengths</h4>
                        <ul>
                            {displayedStrengths.slice(0, 4).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="score-insight-box suggestion-box">
                        <h4>↗ Improvement suggestions</h4>
                        <ul>
                            {displayedSuggestions.slice(0, 5).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {!!analysis.skills?.length && (
                <div className="detected-skills">
                    <h4>Detected skills</h4>
                    <div className="skill-chip-list">
                        {analysis.skills.map((skill) => (
                            <span className="skill-chip" key={skill}>{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ResumeScoreCard;
