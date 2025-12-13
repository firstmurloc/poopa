const db = firebase.database();
const leaderboardRef = db.ref('leaderboard');

// Dodaje wynik gracza do bazy
function addPlayerScore(name, score){
  leaderboardRef.push({
    name: name,
    score: score,
    date: new Date().toLocaleDateString()
  });
}

// Funkcja wyświetlająca leaderboard w kolejności malejącej wyników
function showLeaderboard(){
  document.getElementById('leaderboard').innerHTML='Loading global leaderboard...';

  // Nasłuchiwanie zmian w czasie rzeczywistym
  leaderboardRef.on('value', snapshot => {
    let html = '<div id="leaderboardList">';
    if (!snapshot.exists()) {
      html += '<p>No scores yet! Be the first! 🏆</p>';
    } else {
      const entries = [];
      snapshot.forEach(child => entries.push(child.val()));

      // Sortowanie od najwyższego wyniku
      entries.sort((a, b) => b.score - a.score);

      entries.forEach((entry, i) => {
        html += `<div class="leaderboard-entry"><span>#${i+1} ${entry.name}</span><span>${entry.score}/7 (${entry.date})</span></div>`;
      });
    }
    html += '</div>';
    document.getElementById('leaderboard').innerHTML = html;
  });

  showScreen('leaderboardScreen');
}
