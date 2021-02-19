const FPS = 60;
const refresh_rate = 1000 / FPS;

const top_height = 40;

const bird = document.getElementById('bird');
const pipe1_1 = document.getElementById('pipe1_1');
const pipe1_2 = document.getElementById('pipe1_2');
const pipe1_1_top = document.getElementById('pipe1_1_top');
const pipe1_2_top = document.getElementById('pipe1_2_top');
const pipe2_1 = document.getElementById('pipe2_1');
const pipe2_2 = document.getElementById('pipe2_2');
const pipe2_1_top = document.getElementById('pipe2_1_top');
const pipe2_2_top = document.getElementById('pipe2_2_top');

const high_score_el = document.getElementById('high_score');
const score = document.getElementById('score');

const gap = 200;

var high_score = 0;

var score_counter = 0;
var up_counter = 0;
var pipe_delay = 150;

var accelaration = 0;

var flappy_state = 0;

function restart() {
    flappy_state = 0;

    accelaration = 0;
    score_counter = 0;
    up_counter = 0;
    pipe_delay = 150;

    bird.style.top = '300px';
    bird.style.left = '200px';

    pipe1_1.style.right = '0px';
    pipe1_2.style.right = '0px';
    pipe1_1_top.style.right = '-5px';
    pipe1_2_top.style.right = '-5px';
    pipe2_1.style.right = '0px';
    pipe2_2.style.right = '0px';
    pipe2_1_top.style.right = '-5px';
    pipe2_2_top.style.right = '-5px';

    pipe1_2.style.top = '500px';
    pipe2_2.style.top = '500px';
    pipe1_1_top.style.top ='260px';
    pipe1_2_top.style.top ='500px';
    pipe2_1_top.style.top ='260px';
    pipe2_2_top.style.top ='500px';

    pipe2_1.style.display = 'none';
    pipe2_2.style.display = 'none';
    pipe2_1_top.style.display = 'none';
    pipe2_2_top.style.display = 'none';

    init(pipe1_1, pipe1_2, pipe1_1_top, pipe1_2_top);
    init(pipe2_1, pipe2_2, pipe2_1_top, pipe2_2_top);
}

function getPixels(value) {
    return parseInt(value.substring(0, value.length));
}

function getRandom() {
    const max = 1 / 2 * window.innerHeight;
    const min = 0;
    return parseInt(Math.random() * (max - min) + min);
}

function init(e1, e2, et1, et2) {
    h1 = getRandom()
    h2 = getDifference(h1)
    e1.style.height = h1 + 'px';
    e2.style.height = h2 + 'px';
    e2.style.top = h1 + gap + 'px';

    et1.style.top = h1 - top_height + 'px';
    et2.style.top = h1 + gap + 'px';
    et1.style.right = '-5px';
    et2.style.right = '-5px';

    e1.style.right = '0px';
    e2.style.right = '0px';
}

function getDifference(num) {
    return window.innerHeight - num - gap;
}

function doOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function render() {
    let accelaration = score_counter / 100 * 0.5;

    high_score_el.innerText = 'High score: ' + high_score;
    score.innerText = 'Score: ' + parseInt(score_counter);

    bird.style.top = (getPixels(bird.style.top) + 5) + 'px';
    if (up_counter > 0) {
        bird.style.transform = 'rotate(-' + up_counter * 3 + 'deg)';
        bird.style.top = (getPixels(bird.style.top) - 10) + 'px';
        up_counter--;
    } else if (up_counter <= 0 && up_counter > -20) {
        up_counter--;
        bird.style.transform = 'rotate(' + (-1) * up_counter * 3 + 'deg)';
    } else {
        bird.style.transform = 'rotate(90deg)';
        bird.style.top = (getPixels(bird.style.top) + 2) + 'px';
    }

    pipe1_1.style.right = (getPixels(pipe1_1.style.right) + 5 + accelaration)  + 'px';
    pipe1_2.style.right = (getPixels(pipe1_2.style.right) + 5 + accelaration) + 'px';
    pipe1_1_top.style.right = (getPixels(pipe1_1_top.style.right) + 5 + accelaration)  + 'px';
    pipe1_2_top.style.right = (getPixels(pipe1_2_top.style.right) + 5 + accelaration) + 'px';

    if (getPixels(pipe1_1.style.right) > window.innerWidth) {
        init(pipe1_1, pipe1_2, pipe1_1_top, pipe1_2_top);
    }
    if (getPixels(pipe2_1.style.right) > window.innerWidth) {
        init(pipe2_1, pipe2_2, pipe2_1_top, pipe2_2_top)
    }

    if (pipe_delay == 0) {
        pipe2_1.style.display = 'block';
        pipe2_2.style.display = 'block';
        pipe2_1_top.style.display = 'block';
        pipe2_2_top.style.display = 'block';
        pipe2_1.style.right = (getPixels(pipe2_1.style.right) + 5 + accelaration) + 'px';
        pipe2_2.style.right = (getPixels(pipe2_2.style.right) + 5 + accelaration) + 'px';
        pipe2_1_top.style.right = (getPixels(pipe2_1_top.style.right) + 5 + accelaration) + 'px';
        pipe2_2_top.style.right = (getPixels(pipe2_2_top.style.right) + 5 + accelaration) + 'px';
    }
    if (pipe_delay > 0) {
        pipe_delay--;
    }

    bird_rect = bird.getBoundingClientRect();
    pipe1_1_rect = pipe1_1.getBoundingClientRect();
    pipe1_2_rect = pipe1_2.getBoundingClientRect();
    pipe2_1_rect = pipe2_1.getBoundingClientRect();
    pipe2_2_rect = pipe2_2.getBoundingClientRect();
    pipe1_1_top_rect = pipe1_1_top.getBoundingClientRect();
    pipe1_2_top_rect = pipe1_2_top.getBoundingClientRect();
    pipe2_1_top_rect = pipe2_1_top.getBoundingClientRect();
    pipe2_2_top_rect = pipe2_2_top.getBoundingClientRect();

    if (doOverlap(bird_rect, pipe1_1_rect) || doOverlap(bird_rect, pipe1_2_rect) || doOverlap(bird_rect, pipe2_1_rect) || doOverlap(bird_rect, pipe2_2_rect) || doOverlap(bird_rect, pipe1_1_top_rect) || doOverlap(bird_rect, pipe1_2_top_rect) || doOverlap(bird_rect, pipe2_1_top_rect) || doOverlap(bird_rect, pipe2_2_top_rect) || bird_rect.bottom >= window.innerHeight) {
        alert('Game over! Your score: ' + score_counter);

        if (score_counter > high_score) {
            high_score = parseInt(score_counter);
        }

        clearInterval(int);

        restart();

        int = setInterval(doLap, refresh_rate);
    }
}

document.addEventListener('keyup', function(e) {
    if (e.keyCode === 32) {
        up_counter = 15;
    }
});

function doLap() {
    render();
    score_counter++;
    flappy_state++;
    if (flappy_state == 2) {
        bird.style.backgroundImage = "url('./images/flappy2.png')";
    } else if (flappy_state == 4) {
        bird.style.backgroundImage = "url('./images/flappy.png')";
        flappy_state = 0;
    }
}

restart();

var int = setInterval(doLap, refresh_rate);
