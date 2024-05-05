
let currentPlayer = 'X';
let gameActive = true; // אם המשחק נגמר false האם המשחק פעיל - הופך ל

document.querySelector('.btn-start-with-friend').addEventListener('click', function() {
    document.querySelector(`.js-status`).innerText = "מתחיל משחק חדש";
    resetGame();
    startGameWithFriend(); 
});

document.querySelector('.btn-start-with-computer').addEventListener('click', function() {
    document.querySelector(`.js-status`).innerText = "מתחיל משחק חדש";
    resetGame();
    startGameWithComputer(); 
});



function resetGame() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.innerText = ''; // ניקוי התאים
        cell.style.color = ''; // איפוס הצבע
        cell.removeEventListener('click', playerMove); 
        cell.removeEventListener('click', computerMove); 
        cell.removeEventListener('click', startGameWithFriend);
    });
}

function startGameWithFriend() {

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', playerFriendMove); 
    });
    document.querySelector(`.js-status`).innerText = "משחק מול חבר";

    currentPlayer = 'X'; 
    gameActive = true; 
}

function startGameWithComputer() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', computerMove);
        cell.removeEventListener('click', playerMove); 
        cell.addEventListener('click', playerMove);

    });
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // בוחר באופן רנדומלי מי מתחיל
   
    gameActive = true; 
    if (currentPlayer === 'O') {
        document.querySelector(`.js-status`).innerText = "המחשב מתחיל ראשון";
        setTimeout(computerMove, 500); // נותן זמן לשחקן לראות את ההודעה לפני המהלך
    }
    else
        document.querySelector(`.js-status`).innerText = "אתה מתחיל ראשון";

}



function playerFriendMove() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', playerFriendMove);
  });

  // אם התא כבר מכיל X או O, לא נוסיף שוב
  if (this.innerText !== '' || !gameActive) 
        return;

  // הוספת הסימן של השחקן הנוכחי לתא
  this.innerText = currentPlayer;

  // קביעת צבע הטקסט בהתאם לשחקן
  if (currentPlayer === 'O') {
      this.style.color = '#dc3545'; // עיגול אדום
  } else {
      this.style.color = '#007bff'; // איקס כחול
  }

  // בדיקת ניצחון
  if (checkWin()) {
    document.querySelector(`.js-status`).innerText = " ניצחון ל "+ currentPlayer + "!";
      gameActive = false;
      return;
  }

  if (checkDraw()) {
      //alert('תיקו - שחקו שוב!');
      document.querySelector(`.js-status`).innerText = " תיקו - שחקו שוב!";

      gameActive = false;
      return;
  }

  // החלפת השחקן הנוכחי
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

}


//בדיקת תיקו
function checkDraw() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerText === '') {
          return false;
      }
  }
  document.querySelector(`.js-status`).innerText = " תיקו - שחקו שוב!";
  return true;
}   


function playerMove() {
  if (this.innerText !== '' || currentPlayer !== 'X' || !gameActive) 
    return; // מבטיח שהתא ריק וזה תור השחקן

  this.innerText = 'X';
  // בדיקת ניצחון לפני שמעדכנים את השחקן
  if (checkWin()) {
     document.querySelector(`.js-status`).innerText = "כל הכבוד - ניצחת את המחשב!";
      gameActive = false; // מסמן שהמשחק נגמר
      return;
  }
  else if (checkDraw()) {
      gameActive = false; // מסמן שהמשחק נגמר
      return;
  }
  // מעדכן את השחקן רק אם המשחק נמשך
  currentPlayer = 'O';
  setTimeout(computerMove, 500);

}

function computerMove() {
  if (currentPlayer !== 'O' || !gameActive) 
    return; // מבטיח שזה תור המחשב

  const cells = document.querySelectorAll('.cell');
  let move = findWinningMove('O', cells) || findWinningMove('X', cells) || findRandomMove(cells);
  if (move !== undefined) {
      cells[move].innerText = 'O';
      if (checkWin()) { // קריאה ל-checkWin לפני החלפת השחקן
         document.querySelector(`.js-status`).innerText = "אוו הפעם הפסדת - נסה שוב!";
          gameActive = false; // מסמן שהמשחק נגמר
          return;
      }
      else if (checkDraw()) {
        gameActive = false; // מסמן שהמשחק נגמר
        return;
    }
      currentPlayer = 'X'; // מעדכן את השחקן רק אם המשחק נמשך
  }


}

  


function findWinningMove(player, cells) {
  const patterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
  ];
  for (const pattern of patterns) {
      const values = pattern.map(index => cells[index].innerText);
      if (values.filter(v => v === player).length === 2 && values.includes('')) {
          return pattern[values.indexOf('')];
      }
  }
}

function findRandomMove(cells) {
  const emptyIndices = [...cells].map((cell, index) => cell.innerText === '' ? index : -1).filter(index => index !== -1);
  if (emptyIndices.length > 0) {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }
}




function checkWin() {
  const cells = document.querySelectorAll('.cell');
  const patterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // שורות
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // עמודות
      [0, 4, 8], [2, 4, 6]             // אלכסונים
  ];

  // בדיקת כל דפוס ניצחון אם כולם מכילים את אותו השחקן
  return patterns.some(pattern => {
      return pattern.every(index => cells[index].innerText === currentPlayer);
  });
}
