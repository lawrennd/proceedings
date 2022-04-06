
document.addEventListener("DOMContentLoaded", function () {
    /* ---- CORE ---- */
    const canvas = document.getElementById('bg-particle-animation');
    const context = canvas.getContext('2d');
    windowWidth = canvas.width = document.querySelector('.block__hero--large').offsetWidth;
    windowHeight = canvas.height = document.querySelector('.block__hero--large').offsetHeight;
    /* ---- CORE END ---- */
    /* ---- CREATING ZONE ---- */

    function checkWidth() {
        if (windowWidth <= 768) {
            return 100;
        } else {
            return 175;
        }
    }

    /* ---- SETTINGS ---- */
    const numberParticlesStart = 250;
    const particleSpeed = 0.1;
    const velocity = 0.5;
    const circleWidth = checkWidth();

    /* ---- INIT ---- */
    let particles = [];

    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min);


    /* ---- Particle ---- */
    function Particle(x, y) {
        this.x = x;
        this.y = y;

        this.vel = {
            x: getRandomFloat(-20, 20) / 100,
            y: getRandomFloat(-20, 20) / 100,
            min: getRandomFloat(2, 10),
            max: getRandomFloat(10, 100) / 10
        }

        this.color = 'rgba(255, 255, 255, 0.03)';
    }

    Particle.prototype.render = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.fill();
    };

    Particle.prototype.update = function () {

        const forceDirection = {
            x: getRandomFloat(-1, 1),
            y: getRandomFloat(-1, 1),
        };

        if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
            this.vel.x += forceDirection.x;
        }
        if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
            this.vel.y += forceDirection.y;
        }

        this.x += this.vel.x * particleSpeed;
        this.y += this.vel.y * particleSpeed;

        if (Math.abs(this.vel.x) > this.vel.min) {
            this.vel.x *= velocity;
        }
        if (Math.abs(this.vel.y) > this.vel.min) {
            this.vel.y *= velocity;
        }
    };

    Particle.prototype.setPosition = function (pos, coor) {
        if (coor === 'x') {
            this.x = pos;
        } else if (coor === 'y') {
            this.y = pos;
        }
    };

    /* ---- Functions ----*/
    function loop() {
        let i;
        const length = particles.length;
        for (i = 0; i < length; i++) {
            particles[i].update();
            particles[i].render();
        }
        requestAnimationFrame(loop);
    }

    /* ---- START ---- */
    function init() {
        let i;
        for (i = 0; i < numberParticlesStart; i++) {
            const angle = Math.random() * 360;
            particles.push(new Particle(
                windowWidth * 0.5 + (Math.cos(angle) * circleWidth),
                windowHeight * 0.5 - (Math.sin(angle) * circleWidth),
            ));
        }
    }
    init();
    window.onresize = () => {
        windowWidth = canvas.width = document.querySelector('.block__hero--large').offsetWidth;
        windowHeight = canvas.height = document.querySelector('.block__hero--large').offsetHeight;
        particles = [];
        context.clearRect(0, 0, windowWidth, windowHeight);
        init();
    }

    setInterval(function () {
        particles = [];
        context.clearRect(0, 0, windowWidth, windowHeight);
        init();
    }, 60000);

    loop();
});