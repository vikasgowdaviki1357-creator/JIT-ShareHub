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

      <h1>🏆 Student Leaderboard</h1>

      <div className="leaderboard-list">

        {students.map((student, index) => (

          <div
            key={index}
            className="leader-card"
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