const $btnKick = document.getElementById("btn-kick");
const $btnSpecialKick = document.getElementById("btn-special-kick");

const renderHPLife = function() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
};

const renderProgressbarHP = function() {
    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';

    this.elProgressbar.classList.remove('low', 'critical');

    if (percent < 60 && percent > 20) {
        this.elProgressbar.classList.add('low');
    } else if (percent <= 20) {
        this.elProgressbar.classList.add('critical');
    }
};

const renderHP = function() {
    this.renderHPLife();
    this.renderProgressbarHP();
};

const changeHP = function(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бідний ' + this.name + ' програв бій!');

        if (this === character) {
            $btnKick.disabled = true;
            $btnSpecialKick.disabled = true;
        }
    }

    this.renderHP();
    checkAllEnemiesDefeated();
};

const character = {
    name: 'Pikachu',
    defaultHP: 300,
    damageHP: 300,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),

    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

const enemy1 = {
    name: 'Charmeleon',
    defaultHP: 150,
    damageHP: 150,
    elHP: document.getElementById('health-enemy-1'),
    elProgressbar: document.getElementById('progressbar-enemy-1'),

    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

const enemy2 = {
    name: 'Bulbasaur',
    defaultHP: 160,
    damageHP: 160,
    elHP: document.getElementById('health-enemy-2'),
    elProgressbar: document.getElementById('progressbar-enemy-2'),

    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy1.renderHP();
    enemy2.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

// Проверка на то убиты ли два врага
function checkAllEnemiesDefeated() {
    if (enemy1.damageHP <= 0 && enemy2.damageHP <= 0) {
        alert(character.name + ' переміг усіх!');
        $btnKick.disabled = true;
        $btnSpecialKick.disabled = true;
    }
}

// Обработчик раудна боя
function handleAttack(playerDamageMax) {
    if (enemy1.damageHP > 0) {
        character.changeHP(random(15));
    }
    if (enemy2.damageHP > 0) {
        character.changeHP(random(15));
    }

    if (character.damageHP > 0) {
        enemy1.changeHP(random(playerDamageMax));
        enemy2.changeHP(random(playerDamageMax));
    }
}

// стандартная атака (до 30 хп)
$btnKick.addEventListener('click', function() {
    console.log('Thunder Shock!');
    handleAttack(30);
});

// - сильная атака (до 50 хп)
$btnSpecialKick.addEventListener('click', function() {
    console.log('Mega Shock!');
    const damage = Math.floor(Math.random() * 51) + 50; // от 50 до 100 включительно
    handleAttack(damage);
});

init();
