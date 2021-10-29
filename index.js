window.onload = () => {
  runTask1();
  runTask2();
  runTask3();
};

/* START TASK 1: Your code goes here */
const handleTableClick = event => {
  let target = event.target;
  let rows = document.querySelectorAll('.coloration-table tr');
  let special = document.getElementById('special');
  let firstCol = [];
  for (const row of rows) {
    firstCol.push(row.children[0]);
  }
  if (firstCol.some(tr => tr === target)) {
    for (const tr of target.parentElement.children) {
      if (!tr.classList.contains('yellow')) {
        tr.classList.toggle('blue');
      }
    }
  } else if (target !== special) {
    target.classList.toggle('yellow');
  } else {
    rows.forEach(tr => {
      for (const td of tr.children) {
        if (
          !td.classList.contains('yellow') &&
          !td.classList.contains('blue')
        ) {
          td.classList.toggle('green');
        }
      }
    });
  }
};
function runTask1() {
  let div1 = document.querySelector('#task1');
  let tmpl1 = div1.querySelector('#tmpl1');
  div1.appendChild(tmpl1.content.cloneNode(true));
  let table = document.querySelectorAll('.coloration-table')[0];
  table.addEventListener('click', handleTableClick);
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const handleOnInput = event => {
  const regex = /^\+380(\d){9,9}$/;
  const userInput = event.target.value || '';
  let divInfo = document.querySelector('.field');
  let submit = divInfo.querySelector('.field input[type=submit]');
  if (regex.test(userInput)) {
    divInfo.classList.remove('error');
    submit.disabled = false;
  } else {
    divInfo.classList.add('error');
    submit.disabled = true;
  }
};
const handleSubmit = event => {
  const SUCCESS_TIME = 5000; // 5sec
  let divInfo = document.querySelector('.field');
  divInfo.classList.add('success');
  setTimeout(() => {
    divInfo.classList.remove('success');
  }, SUCCESS_TIME);
  let phoneInput = document.getElementById('input-phone');
  phoneInput.value = '';
  let submit = divInfo.querySelector('.field input[type=submit]');
  submit.disabled = true;
  event.preventDefault();
};
function runTask2() {
  let div2 = document.querySelector('#task2');
  let tmpl2 = div2.querySelector('#tmpl2');
  div2.appendChild(tmpl2.content.cloneNode(true));
  let form = document.getElementById('form-phone');
  let phoneInput = document.getElementById('input-phone');
  form.addEventListener('submit', handleSubmit);
  phoneInput.addEventListener('input', handleOnInput);
}
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let rotate = 0;
const ROLL_STEP = 360;
const A_SCORE_AREA = {
  left: 35,
  top: 156,
  height: 15,
  width: 15
};
const B_SCORE_AREA = {
  left: 552,
  top: 156,
  height: 15,
  width: 15
};
let scoreA = 0,
  scoreB = 0;

const handleMouseDown = event => {
  let ball = document.getElementById('ball');
  if (event.target === ball) {
    return;
  }
  const ballCenterOffsetX = Math.ceil(ball.offsetWidth / +'2');
  const ballCenterOffsetY = Math.ceil(ball.offsetHeight / +'2');
  ball.style.left = event.offsetX - ballCenterOffsetX + 'px';
  ball.style.top = event.offsetY - ballCenterOffsetY + 'px';
  rotate =
    event.offsetX - ball.offsetLeft < 0
      ? rotate - ROLL_STEP
      : rotate + ROLL_STEP;
  ball.style.transform = `rotate(${rotate}deg)`;

  if (
    event.offsetX >= A_SCORE_AREA.left &&
    event.offsetX <= A_SCORE_AREA.left + A_SCORE_AREA.width &&
    event.offsetY >= A_SCORE_AREA.top &&
    event.offsetY <= A_SCORE_AREA.top + A_SCORE_AREA.height
  ) {
    event.target.dispatchEvent(
      new CustomEvent('score', { detail: { team: 'B', score: scoreB + 1 } })
    );
  } else if (
    event.offsetX >= B_SCORE_AREA.left &&
    event.offsetX <= B_SCORE_AREA.left + B_SCORE_AREA.width &&
    event.offsetY >= B_SCORE_AREA.top &&
    event.offsetY <= B_SCORE_AREA.top + B_SCORE_AREA.height
  ) {
    event.target.dispatchEvent(
      new CustomEvent('score', { detail: { team: 'A', score: scoreA + 1 } })
    );
  }
};
const handleScore = event => {
  let team = event.detail.team;
  let newScore = event.detail.score;
  const TIMEOUT = 3000; // 3sec
  let scoreASpan = document.getElementById('team-a-score');
  let scoreBSpan = document.getElementById('team-b-score');
  let scoreboard = document.getElementById('scoreboard');
  switch (team) {
    case 'A':
      scoreA = newScore;
      scoreASpan.innerText = scoreA;
      scoreboard.classList.add('score-msg-a');
      setTimeout(() => scoreboard.classList.remove('score-msg-a'), TIMEOUT);
      break;
    case 'B':
      scoreB = newScore;
      scoreBSpan.innerText = scoreB;
      scoreboard.classList.add('score-msg-b');
      setTimeout(() => scoreboard.classList.remove('score-msg-b'), TIMEOUT);
      break;
    default:
      break;
  }
};
function runTask3() {
  let div3 = document.querySelector('#task3');
  let tmpl3 = div3.querySelector('#tmpl3');
  div3.appendChild(tmpl3.content.cloneNode(true));
  let field = document.getElementById('field');
  field.addEventListener('mousedown', handleMouseDown);
  field.addEventListener('score', handleScore);
  let scoreASpan = document.getElementById('team-a-score');
  let scoreBSpan = document.getElementById('team-b-score');
  scoreASpan.innerText = scoreA;
  scoreBSpan.innerText = scoreB;
}
/* END TASK 3 */
