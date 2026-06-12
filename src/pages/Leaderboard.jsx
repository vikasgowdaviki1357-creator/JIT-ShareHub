import "./../styles/Leaderboard.css";

function Leaderboard() {

  const students = [
    {
      name: "Viki",
      points: 1250
    },
    {
      name: "Rahul",
      points: 980
    },
    {
      name: "Priya",
      points: 910
    }
  ];

  return (
    <div className="leaderboard-page">

      <div className="leaderboard-hero">

        <div className="hero-badge">🏆 LEADERBOARD</div>

        <h1 className="hero-title">Leaderboard</h1>
        <h2 className="hero-subtitle">See where you stand.</h2>

        <p className="hero-desc">
          Top contributors ranked by points earned through
          activity across JIT ShareHub.
        </p>

        <div className="hero-icon">🏅</div>

      </div>

      <div className="leaderboard-list">

        {students.map((student, index) => (

          <div
            key={index}
            className={`leader-card ${index === 0 ? "rank-gold" : index === 1 ? "rank-silver" : index === 2 ? "rank-bronze" : ""}`}
          >

            <h2>
              #{index + 1}
            </h2>

            <h3>
              {student.name}
            </h3>

            <p>
              ⭐ {student.points} Points
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Leaderboard;
