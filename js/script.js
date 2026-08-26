(function() {
  const slide = document.getElementById('carouselSlide');
  const images = slide.querySelectorAll('img');
  const total = images.length;
  let currentIndex = 0;
  let autoInterval = null;

  // Crear indicadores
  const indicatorsContainer = document.getElementById('indicators');
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', function() {
      goTo(parseInt(this.dataset.index));
    });
    indicatorsContainer.appendChild(dot);
  }

  const dots = indicatorsContainer.querySelectorAll('.dot');

  function updateSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;
    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    updateSlide(index);
    resetAutoPlay();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function resetAutoPlay() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
    autoInterval = setInterval(next, 5000);
  }

  // Botones
  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);

  // Iniciar autoplay
  resetAutoPlay();

  // Pausar al pasar el mouse (opcional)
  const container = document.querySelector('.carousel-container');
  container.addEventListener('mouseenter', function() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  });
  container.addEventListener('mouseleave', function() {
    if (!autoInterval) {
      autoInterval = setInterval(next, 5000);
    }
  });

  // Inicializar
  updateSlide(0);
})();