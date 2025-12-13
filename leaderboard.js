const db = firebase.database();
const leaderboardRef = db.ref('leaderboard');

// Dodaje wynik gracza
function addPlayerScore(name, score){
  leaderboardRef.push({
    name: name,
    score: Number(score), // upewniamy się, że score jest liczbą
    date: new Date().toLocaleDateString()
  });
}

// Wyświetla leaderboard w kolejności malejącej score
function showLeaderboard(){
  document.getElementById('leaderboard').innerHTML='Loading global leaderboard...';

  // Pobieramy wszystkie rekordy i nasłuchujemy zmiany w czasie rzeczywistym
  leaderboardRef.on('value', snapshot => {
    const htmlEntries = [];
    snapshot.forEach(child => htmlEntries.push(child.val()));

    // Sortowanie od najwyższego wyniku
    htmlEntries.sort((a, b) => b.score - a.score);

    // Budujemy HTML
    let html = '<div id="leaderboardList">';
    if (htmlEntries.length === 0) {
      html += '<p>No scores yet! Be the first! 🏆</p>';
    } else {
      htmlEntries.forEach((entry, i) => {
        html += `<div class="leaderboard-entry">
                   <span>#${i+1} ${entry.name}</span>
                   <span>${entry.score}/7 (${entry.date})</span>
                 </div>`;
      });
    }
    html += '</div>';
    document.getElementById('leaderboard').innerHTML = html;
  });

  showScreen('leaderboardScreen');
}
