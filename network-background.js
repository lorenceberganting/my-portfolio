const canvas = document.querySelector(".network-background");
const context = canvas?.getContext("2d");

if (canvas && context) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: -1, y: -1 };
  let particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastFrame = 0;

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.min(64, Math.max(30, Math.round(width / 16)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
    }));

    draw();
  }

  function draw() {
    if (!width || !height) return;

    context.clearRect(0, 0, width, height);
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--network-rgb")
      .trim();
    const maxDistance = Math.min(190, width * 0.42);
    const pointerRadius = 170;

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      const fade = 0.55 + 0.45 * Math.pow(Math.max(0, 1 - particle.y / height), 1.05);
      const pointerDistance = Math.hypot(
        particle.x - pointer.x,
        particle.y - pointer.y,
      );
      const pointerBoost =
        pointerDistance < pointerRadius
          ? 1 - pointerDistance / pointerRadius
          : 0;

      for (let j = i + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(
          particle.x - other.x,
          particle.y - other.y,
        );

        if (distance < maxDistance) {
          const otherPointerDistance = Math.hypot(
            other.x - pointer.x,
            other.y - pointer.y,
          );
          const nearbyPointer =
            Math.max(
              0,
              1 - Math.min(pointerDistance, otherPointerDistance) / pointerRadius,
            ) * 0.48;
          const otherFade =
            0.55 + 0.45 * Math.pow(Math.max(0, 1 - other.y / height), 1.05);
          const lineFade = (fade + otherFade) / 2;
          const opacity = ((1 - distance / maxDistance) * 0.82 + nearbyPointer) * lineFade;

          context.strokeStyle = `rgba(${accent}, ${opacity})`;
          context.lineWidth = 1.3;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      context.fillStyle = `rgba(${accent}, ${(0.76 + pointerBoost * 0.24) * fade})`;
      context.beginPath();
      context.arc(particle.x, particle.y, 2.2 + pointerBoost * 1.4, 0, Math.PI * 2);
      context.fill();
    }
  }

  function animate(timestamp) {
    if (timestamp - lastFrame >= 32) {
      const elapsed = Math.min(timestamp - lastFrame, 48);
      lastFrame = timestamp;

      for (const particle of particles) {
        particle.x += particle.vx * elapsed;
        particle.y += particle.vy * elapsed;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      }

      draw();
    }

    if (!reducedMotion.matches) {
      frame = window.requestAnimationFrame(animate);
    }
  }

  function updateMotionPreference() {
    window.cancelAnimationFrame(frame);
    lastFrame = 0;
    draw();
    if (!reducedMotion.matches) {
      frame = window.requestAnimationFrame(animate);
    }
  }

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (reducedMotion.matches) draw();
  });

  window.addEventListener("blur", () => {
    pointer.x = -1;
    pointer.y = -1;
    if (reducedMotion.matches) draw();
  });

  window.addEventListener("resize", resizeCanvas);
  reducedMotion.addEventListener("change", updateMotionPreference);
  resizeCanvas();
  updateMotionPreference();
}
