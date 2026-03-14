document.addEventListener("DOMContentLoaded", function () {
  const cover = document.querySelector(".cover");
  const contentContainer = document.querySelector(".content-container");
  const tabs = document.querySelectorAll(".tab");
  const tabBar = document.querySelector(".tab-bar");

  const contents = {
    "about-tab": document.getElementById("about-content"),
    "works-tab": document.getElementById("works-content"),
    "contact-tab": document.getElementById("contact-content")
  };

  cover.addEventListener("mouseenter", function () {
    if (!cover.classList.contains("cover-active")) {
      cover.classList.add("cover-active");
      setTimeout(() => {
        contentContainer.classList.add("show-content");
      }, 800);
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      tabs.forEach(t => t.classList.remove("tab-active"));
      Object.values(contents).forEach(c => c.classList.remove("content-active"));
      tabBar.classList.remove("active-about", "active-works", "active-contact");
      tab.classList.add("tab-active");
      contents[tab.id]?.classList.add("content-active");

      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });

      if (tab.id === "about-tab") tabBar.classList.add("active-about");
      else if (tab.id === "works-tab") tabBar.classList.add("active-works");
      else if (tab.id === "contact-tab") tabBar.classList.add("active-contact");
    });
  });

  document.querySelectorAll('.card-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const inner = wrapper.querySelector('.flip-inner');
      inner.classList.toggle('flipped');
      wrapper.classList.toggle('clicked');
      document.querySelectorAll('.card-wrapper').forEach(other => {
        if (other !== wrapper) {
          other.classList.remove('clicked');
          other.querySelector('.flip-inner')?.classList.remove('flipped');
        }
      });
    });
  });

  document.getElementById("about-tab").click();

  document.querySelectorAll('.project-cta').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = 'flex';

      const carouselImages = modal.querySelector('.carousel-images');
      const images = modal.querySelectorAll('.carousel-images img');
      const prevBtn = modal.querySelector('.prev');
      const nextBtn = modal.querySelector('.next');
      let index = 0;

      if (!carouselImages || images.length === 0) return;

      carouselImages.style.width = `${100 * images.length}%`;
      images.forEach(img => {
        img.style.width = `${100 / images.length}%`;
        img.style.flexShrink = '0';
      });

      function updateCarousel() {
        carouselImages.style.transform = `translateX(-${(100 / images.length) * index}%)`;
      }

      prevBtn?.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
      });

      nextBtn?.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateCarousel();
      });

      updateCarousel();
    });
  });

  document.querySelectorAll('.modal .close').forEach(close => {
    close.addEventListener('click', () => {
      close.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
});
