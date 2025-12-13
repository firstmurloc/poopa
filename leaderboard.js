// leaderboard.js
const leaderboardRef = firebase.database().ref('leaderboard');

function addPlayerScore(name, score) {
  leaderboardRef.push({
    name: name,
    score: Number(score),
    date: new Date().toLocaleDateString()
  });
}

function showLeaderboard(){
  document.getElementById('leaderboard').innerHTML='Loading leaderboard...';

  leaderboardRef.once('value').then(snapshot => {
    const entries = [];
    snapshot.forEach(child => {
      const val = child.val();
      entries.push({key: child.key, name: val.name, score: Number(val.score), date: val.date});
    });

    // Sortujemy malejąco po score, przy remisie po key (stabilizacja)
    entries.sort((a,b) => {
      if(b.score !== a.score) return b.score - a.score;
      return a.key.localeCompare(b.key);
    });

    let html = '<div id="leaderboardList">';
    if(entries.length === 0){
      html += '<p>No scores yet! Be the first! 🏆</p>';
    } else {
      entries.forEach((entry,i) => {
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
