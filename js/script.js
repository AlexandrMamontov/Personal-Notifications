document.addEventListener("DOMContentLoaded", function () {
  // все карточки с уведомлениями
  const cards = document.querySelectorAll(".main__card");
  // при клике на карточку она становится прочитанной и активной
  // при повторном клике она становится неактивной, но остаётся прочитанной
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const wasActive = card.classList.contains("active");
      cards.forEach((c) => c.classList.remove("active"));
      if (!wasActive) {
        card.classList.add("read");
        card.classList.add("active");
      }
    });
  });

  // кнопки слева в меню
  const blocks = document.querySelectorAll(".menu__block");
  blocks.forEach((block) => {
    const btns = block.querySelectorAll(".menu__btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Проверяем, является ли кликнутая кнопка "filter-btn"
        if (btn.id === "filter-btn") {
          // Если кнопка уже активна, убираем активный класс
          if (btn.classList.contains("active")) {
            btn.classList.remove("active");
          } else {
            // Убираем активный класс у всех кнопок и добавляем активный класс к текущей
            btns.forEach((btn) => {
              btn.classList.remove("active");
            });
            btn.classList.add("active");
          }
        } else {
          // Убираем активный класс у всех кнопок и добавляем активный класс к текущей
          btns.forEach((btn) => {
            btn.classList.remove("active");
          });
          btn.classList.add("active");
        }
      });
    });
  });

  // прочитать все уведомления
  const readAllBtn = document.querySelector(".header__btn");
  readAllBtn.addEventListener("click", function () {
    cards.forEach((card) => {
      card.classList.add("read");
    });
  });
});
