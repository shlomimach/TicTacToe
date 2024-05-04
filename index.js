// document.querySelector('.btn-start-with-computer').addEventListener('click', startGameWithComputer);
// document.querySelector('.btn-start-with-friend').addEventListener('click', startGameWithFriend);


let currentPlayer = 'X';
//window.alert("האם תבחר לשחק מול חבר או מול המחשב?");



function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = ''; // ניקוי התאים
        cell.style.color = ''; // איפוס הצבע
        cell.removeEventListener('click', playerMove); // הסרת האזנה לפונקציה playerMove
        cell.removeEventListener('click', computerMove); // הסרת האזנה לפונקציה computerMove
        cell.removeEventListener('click', startGameWithFriend); // הסרת האזנה לפונקציה startGameWithFriend
    });
}

function startGameWithFriend() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', playerFriendMove); // הוספת האזנה לפונקציה playerMove
    });
    currentPlayer = 'O'; // תחילת משחק עם השחקן O
    gameActive = true; // מאפשר את המשחק
}

function startGameWithComputer() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', computerMove); // הוספת האזנה לפונקציה computerMove

    });
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // בוחר באופן רנדומלי מי מתחיל
    {
        alert("המשחק התחיל! אתה העיגול והמחשב הוא האיקס");
        alert(`${currentPlayer}  מתחיל!`);
    }
     gameActive = true; // מאפשר את המשחק
    if (currentPlayer === 'X') {
        setTimeout(computerMove, 500); // נותן זמן לשחקן לראות את ההודעה לפני המהלך
    }
}

document.querySelector('.btn-start-with-friend').addEventListener('click', function() {
    resetGame();
    startGameWithFriend(); // מאפס את המשחק ומתחיל משחק חדש
});

document.querySelector('.btn-start-with-computer').addEventListener('click', function() {
    resetGame();
    startGameWithComputer(); // מאפס את המשחק ומתחיל משחק חדש
});



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
      alert(' ניצחון ל' + currentPlayer + '!');
      gameActive = false;
      return;
  }

  if (checkDraw()) {
      alert('תיקו - שחקו שוב!');
      gameActive = false;
      return;
  }

  // החלפת השחקן הנוכחי
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

}

function checkDraw() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerText === '') {
          return false;
      }
  }
  return true;
}   

let gameActive = true; // משתנה גלובלי שמציין אם המשחק פעיל

// function startGameWithComputer() {
//   //resetGame();
//   currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // בוחר באופן רנדומלי מי מתחיל
//   {
//       alert("המשחק התחיל! אתה העיגול והמחשב הוא האיקס");
//       alert(`${currentPlayer}  מתחיל!`);
//   }
   
//   if (currentPlayer === 'X') {
//       setTimeout(computerMove, 500); // נותן זמן לשחקן לראות את ההודעה לפני המהלך
//   }
// }

// function resetGame() {
//   const cells = document.querySelectorAll('.cell');
//   cells.forEach(cell => {
//       cell.innerText = '';
//       cell.removeEventListener('click', playerMove); // מוחק את האירועים הקודמים כדי למנוע כפילויות
//       cell.addEventListener('click', playerMove);
//   });
//   gameActive = true; // מאפשר למשחק להתחיל מחדש
//   currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // בחירה רנדומלית מי מתחיל
//   if (currentPlayer === 'X') {
//       setTimeout(computerMove, 500); // מאפשר למחשב להתחיל אם זה תורו
//   }
// }

function playerMove() {
  if (this.innerText !== '' || currentPlayer !== 'O' || !gameActive) return; // מבטיח שהתא ריק וזה תור השחקן

  this.innerText = 'O';
  // בדיקת ניצחון לפני שמעדכנים את השחקן
  if (checkWin()) {
      alert('כל הכבוד - ניצחת את המחשב!'); // המחשב ניצח
      gameActive = false; // מסמן שהמשחק נגמר
      return;
  }
  else if (checkDraw()) {
      alert('תיקו - שחקו שוב!'); // המחשב ניצח
      gameActive = false; // מסמן שהמשחק נגמר
      return;
  }
  // מעדכן את השחקן רק אם המשחק נמשך
  currentPlayer = 'X';
  setTimeout(computerMove, 500);

}

function computerMove() {
  if (currentPlayer !== 'X' || !gameActive) return; // מבטיח שזה תור המחשב
  const cells = document.querySelectorAll('.cell');
  let move = findWinningMove('X', cells) || findWinningMove('O', cells) || findRandomMove(cells);
  if (move !== undefined) {
      cells[move].innerText = 'X';
      if (checkWin()) { // קריאה ל-checkWin לפני החלפת השחקן
          alert('אוו הפעם הפסדת - נסה שוב!'); // המחשב ניצח
          gameActive = false; // מסמן שהמשחק נגמר
          return;
      }
      else if (checkDraw()) {
        alert('תיקו - שחקו שוב!'); // המחשב ניצח
        gameActive = false; // מסמן שהמשחק נגמר
        return;
    }
      currentPlayer = 'O'; // מעדכן את השחקן רק אם המשחק נמשך
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
