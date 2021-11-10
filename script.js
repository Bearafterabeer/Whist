//obiect pentru starea jocului
let game = {
  //lista de jucatori
  players: [{"name":"Bucu","consecutive":{"wins":0,"loses":0},"score":0,"hands":[]},{"name":"Deea","consecutive":{"wins":0,"loses":0},"score":0,"hands":[]},{"name":"Ida","consecutive":{"wins":0,"loses":0},"score":0,"hands":[]},{"name":"Evi","consecutive":{"wins":0,"loses":0},"score":0,"hands":[]}],
  current_hand: {
    stage: 'none',
    line: 0
  },
  after_dealer: 0,
  stage: 'started',
  dealer: 0,
  roundScore: []
}

const playerModel = {
  name: '',
  consecutive: {
    wins: 0,
    loses: 0,
  },
  score: 0,
  hands: [],

};

function createElementWithText(elementType, text) {
  let element = document.createElement(elementType);
  element.innerText = text;

  return element;
}

function addElementToParentWithText(elementType, text, parent) {
  let element = document.createElement(elementType);
  element.innerText = text;
  // element.dataset.cellIndex = text;

  parent.appendChild(element);
}

function removePlayer(e) {

  const item = e.target;
  const index = parseInt(item.dataset.index);
  game.players.splice(index, 1);
  createTable2(game)
}

function addNewCellToTableData(elementType, text, parent) {
  let element = document.createElement(elementType);
  element.innerText = text;
  parent.appendChild(element);
}


function createTableHead(game, table) {
  let tableHead = document.createElement('thead');
  let tableHeadRow = document.createElement('tr');
  let tableHeadTh = document.createElement('th');
  tableHeadTh.innerText = 'Jocuri';

  table.appendChild(tableHead);
  tableHead.appendChild(tableHeadRow);
  tableHeadRow.appendChild(tableHeadTh);

  // se creaza celule pentru cap de tabel
  for (let i = 0; i < game.players.length; i++) {
    // se creaza jucatorul din obiectul game
    let player = game.players[i];
    let element = createElementWithText('th', player.name); //creaza celula jucator cu nume din obiect
    if (i === game.current_hand.dealer) {
      element.classList.add('dealer');
    } else {
      element.classList.remove('dealer');
    }
    

    element.dataset.index = i;
    element.setAttribute('colspan', '2');
    tableHeadRow.appendChild(element);
    if (game.stage === 'init') {
      let playerRemove = createElementWithText('a', 'x');
      playerRemove.setAttribute('href', '#');
      playerRemove.dataset.index = i;
      element.appendChild(playerRemove);
      playerRemove.addEventListener('click', removePlayer);

    }

  }

}

function createTableBody(game, table) {
  let tableBody = document.createElement('tbody');
  tableBody.setAttribute('class', 'tBody');
  table.appendChild(tableBody);

  let lineIndex = 0;

  //se creaza randuri de jocuri pentru jocuri de 1
  for (let i = 0; i < game.players.length; i++) {
    let gameRow = document.createElement('tr');
    addElementToParentWithText('td', 1, gameRow);
    // se umple cu celule pentru fiecare jucator
    for (let j = 0; j < game.players.length; j++) {
      addElementToParentWithText('td', '', gameRow);
      addElementToParentWithText('td', '', gameRow);
    }
    
    if (lineIndex === game.current_hand.line) {
      gameRow.classList.add('currentLine');
    }
    tableBody.appendChild(gameRow);
    lineIndex ++;

  }
  //se creaza randuri pentru jocurile de la 2 la 7
  for (let i = 1; i < 7; i++) {
    let gameRow = document.createElement('tr')
    // gameRow.dataset.rowIndex = i+1;
    addElementToParentWithText('td', i + 1, gameRow);
    for (let j = 0; j < game.players.length; j++) {
      addElementToParentWithText('td', '', gameRow);
      addElementToParentWithText('td', '', gameRow);
    }
    if (lineIndex === game.current_hand.line) {
      gameRow.classList.add('currentLine');
    }
    tableBody.appendChild(gameRow);
    lineIndex ++;
  }
  //se creaza randuri pentru jocurile de 8
  for (let i = 0; i < game.players.length; i++) {
    let gameRow = document.createElement('tr');
    addElementToParentWithText('td', 8, gameRow)
    for (let j = 0; j < game.players.length; j++) {
      addElementToParentWithText('td', '', gameRow);
      addElementToParentWithText('td', '', gameRow);
    }
    if (lineIndex === game.current_hand.line) {
      gameRow.classList.add('currentLine');
    }
    tableBody.appendChild(gameRow);
    lineIndex ++;
  }
  // se creaza randuri pentru jocurile de la 7 la 2
  for (let i = 7; i > 1; i--) {
    let gameRow = document.createElement('tr');
    addElementToParentWithText('td', i, gameRow)
    for (let j = 0; j < game.players.length; j++) {
      addElementToParentWithText('td', '', gameRow);
      addElementToParentWithText('td', '', gameRow);
    }
    if (lineIndex === game.current_hand.line) {
      gameRow.classList.add('currentLine');
    }
    tableBody.appendChild(gameRow);
    lineIndex ++;
  }
  //se creaza randuri pentru jocurile de 1
  for (let i = 0; i < game.players.length; i++) {
    let gameRow = document.createElement('tr');
    addElementToParentWithText('td', 1, gameRow)
    for (let j = 0; j < game.players.length; j++) {
      addElementToParentWithText('td', '', gameRow);
      addElementToParentWithText('td', '', gameRow);
    }
    if (lineIndex === game.current_hand.line) {
      gameRow.classList.add('currentLine');
    }
    tableBody.appendChild(gameRow);
    lineIndex ++;
  }


}

function createTable2(game) {
  let tbl = document.querySelector('#displayTable');
  // goleste divul care contine tabelul
  tbl.innerHTML = '';
  let table = document.createElement('table');
  tbl.appendChild(table);
  createTableHead(game, table);
  createTableBody(game, table);

}

createTable2(game)

function addPlayer() {
  if (game.players.length === 6) {
    alert('Maximum players');
    return
  }
  let playerInput = document.getElementById('nameText');
  let names = playerInput.value;
  if (names === '') {
    alert('Write your name')
    return;
  }

  // se cloneaza obiectul playerModel si se adauga numele din input
  const player = Object.assign({}, playerModel);
  player.name = names;

  game.players.push(player);
  playerInput.value = '';
  playerInput.focus();
  createTable2(game);

}

function startGame() {
  if (game.players.length < 4) {
    alert('Can not start game, you need at least 4 players');
    return false;
  }
  game.stage = 'started';
  document.querySelector('#addPlayerCnt').style.display = 'none';
  document.querySelector('#handCnt').style.display = 'block';
  toggleHand();
  createTable2(game)
}

function getDealer() {
  let playerIndex = game.current_hand.line % game.players.length - 1;
  if (playerIndex < 0) {
    playerIndex = game.players.length - 1;
  }
  game.current_hand.dealer = playerIndex;

}

function toggleHand() {
  game.current_hand.stage = game.current_hand.stage === 'start' ? 'end' : 'start';

  if (game.current_hand.stage === 'start') {
    document.querySelector('#startHandBtn').style.display = 'none';
    document.querySelector('#endHandBtn').style.display = 'inline';
    getDealer();
  } else {
    document.querySelector('#startHandBtn').style.display = 'inline';
    document.querySelector('#endHandBtn').style.display = 'none';
    game.current_hand.line ++;
    getDealer();
  }
  createTable2(game);
}

function playersChoice() {
  let table = document.querySelector('.currentLine');
  let row = table.querySelectorAll('td');
  let row_array = Array.from(row);
  for (let i = 0; i < row_array.length; i++) {
    const element = row_array[i];
    if (element.innerText === '') {
      if (i % 2 === 1) {
        console.log(element);
        addHands(element)
      }
    }
  }
}

function addHands(elem) {
  let score = prompt()
  elem.innerText = score;
  game.players.hands = score;
  console.log(this.hands);
}

document.getElementById('addPlayerBtn').addEventListener('click', addPlayer);
document.getElementById('startBtn').addEventListener('click', startGame);

document.querySelector('#startHandBtn').addEventListener('click', toggleHand);
document.querySelector('#endHandBtn').addEventListener('click', toggleHand);

document.querySelector('#startBtn').addEventListener('click', playersChoice);


