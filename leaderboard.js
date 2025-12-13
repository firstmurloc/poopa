const db = firebase.database();
const leaderboardRef = db.ref('leaderboard');

function addPlayerScore(name, score){
  leaderboardRef.push({
    name: name,
    score: score,
    date: new Date().toLocaleDateString()
  });
}

function showLeaderboard(){
  document.getElementById('leaderboard').innerHTML='Loading global leaderboard...';

  leaderboardRef.orderByChild('score').limitToLast(10).on('value', snapshot=>{
    let html='<div id="leaderboardList">';
    if(!snapshot.exists()){
      html+='<p>No scores yet! Be the first! 🏆</p>';
    } else {
      const entries=[];
      snapshot.forEach(child=>entries.push(child.val()));
      entries.reverse();
      entries.forEach((entry,i)=>{
        html+=`<div class="leaderboard-entry"><span>#${i+1} ${entry.name}</span><span>${entry.score}/7 (${entry.date})</span></div>`;
      });
    }
    html+='</div>';
    document.getElementById('leaderboard').innerHTML=html;
  });

  showScreen('leaderboardScreen');
}
