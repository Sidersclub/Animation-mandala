const svg = document.getElementById("mandala");
const numPetals = 36;
let isAnimating = true;
let angle = 0;

function generateMandala() {
  for (let i = 0; i < numPetals; i++) {
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#petal");
   use.setAttribute("transform", `rotate(${(360 / numPetals) * i} 500 500) translate(500 200)`);
    use.style.strokeDasharray = "100";
    use.style.strokeDashoffset = "100";
    svg.appendChild(use);

    // Animation d'apparition
    setTimeout(() => {
      use.style.transition = "stroke-dashoffset 1s ease";
      use.style.strokeDashoffset = "0";
    }, i * 50);
  }
}

function animateMandala() {
  const petals = svg.querySelectorAll("use");
  petals.forEach((el, i) => {
    const scale = 1 + 0.1 * Math.sin((angle + i * 10) * Math.PI / 180);
    el.setAttribute("transform",
      `rotate(${(360 / numPetals) * i + angle} 250 250) translate(250 150) scale(${scale})`);
  });
  angle += 0.5;
  if (isAnimating) requestAnimationFrame(animateMandala);
}

document.getElementById("toggleAnimation").addEventListener("click", () => {
  isAnimating = !isAnimating;
  if (isAnimating) {
    document.getElementById("toggleAnimation").textContent = "Pause";
    animateMandala();
  } else {
    document.getElementById("toggleAnimation").textContent = "Loop";
  }
});

// Interaction scroll = changer nombre de pétales
window.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (e.deltaY < 0 && numPetals < 60) {
    location.reload(); // Pour garder simple : reload
  }
}, { passive: false });

// TODO : Interaction voix → optionnel via Web Speech API

generateMandala();
animateMandala();
