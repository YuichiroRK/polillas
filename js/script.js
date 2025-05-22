document.addEventListener("DOMContentLoaded", () => {
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  

  // Pulsación suave sol
  let sunPulse = 1;
  let sunIncreasing = true;

  function pulseSun() {
    if (sunIncreasing) {
      sunPulse += 0.002;
      if (sunPulse >= 1.05) sunIncreasing = false;
    } else {
      sunPulse -= 0.002;
      if (sunPulse <= 0.95) sunIncreasing = true;
    }
    sun.style.transform = `scale(${sunPulse.toFixed(3)})`;
    requestAnimationFrame(pulseSun);
  }
  pulseSun();

  // Parpadeo luna
  let moonOpacity = 1;
  let moonIncreasing = false;

  function blinkMoon() {
    if (moonIncreasing) {
      moonOpacity += 0.004;
      if (moonOpacity >= 1) moonIncreasing = false;
    } else {
      moonOpacity -= 0.004;
      if (moonOpacity <= 0.8) moonIncreasing = true;
    }
    moon.style.opacity = moonOpacity.toFixed(2);
    requestAnimationFrame(blinkMoon);
  }
  blinkMoon();

  // Mariposa - Movimiento vertical oscilante (senoidal)
  const butterfly = document.getElementById("butterfly");
  let butterflyAngle = 0;
  const butterflyAmplitudeX = 80; // amplitud horizontal del movimiento oscilante
  const butterflySpeedY = 1; // velocidad subida
  let butterflyXCenter = window.innerWidth * 0.75; // 3/4 ancho total (mitad derecha)
  let butterflyY = window.innerHeight + 100; // empieza desde abajo

  // Polilla - Movimiento errático restringido al borde izquierdo (1/4 ancho)
  const moth = document.getElementById("moth");
  let mothPos = {
    x: Math.random() * (window.innerWidth / 4),
    y: Math.random() * window.innerHeight,
  };
  let mothSpeed = {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
  };

  function moveButterfly() {
    butterflyAngle += 0.05;
    if (butterflyAngle > 2 * Math.PI) butterflyAngle = 0;

    const x = butterflyXCenter + Math.sin(butterflyAngle) * butterflyAmplitudeX - butterfly.width / 2;
    butterflyY -= butterflySpeedY;
    if (butterflyY < -100) butterflyY = window.innerHeight + 100;

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${butterflyY}px`;

    // Aleteo suave con rotación oscilante
    butterfly.style.transform = `rotate(${Math.sin(butterflyAngle * 6) * 15}deg)`;
  }

  function moveMoth() {
    mothPos.x += mothSpeed.x;
    mothPos.y += mothSpeed.y;

    // Limitar movimiento de polilla a 1/4 del ancho (borde izquierdo)
    if (mothPos.x < 0) {
      mothPos.x = 0;
      mothSpeed.x = -mothSpeed.x;
    } else if (mothPos.x > window.innerWidth / 4 - moth.width) {
      mothPos.x = window.innerWidth / 4 - moth.width;
      mothSpeed.x = -mothSpeed.x;
    }

    if (mothPos.y < 0) {
      mothPos.y = 0;
      mothSpeed.y = -mothSpeed.y;
    } else if (mothPos.y > window.innerHeight - moth.height) {
      mothPos.y = window.innerHeight - moth.height;
      mothSpeed.y = -mothSpeed.y;
    }

    // Cambios aleatorios en dirección (movimiento errático)
    if (Math.random() < 0.03) {
      mothSpeed.x = (Math.random() - 0.5) * 3;
      mothSpeed.y = (Math.random() - 0.5) * 3;
    }

    moth.style.left = `${mothPos.x}px`;
    moth.style.top = `${mothPos.y}px`;

    // Rotación errática
    const rot = Math.sin(mothPos.x * 0.1 + mothPos.y * 0.1) * 30;
    moth.style.transform = `rotate(${rot}deg)`;
  }

  function animate() {
    moveButterfly();
    moveMoth();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    butterflyXCenter = window.innerWidth * 0.75;
    butterflyY = window.innerHeight + 100;
  });
});
