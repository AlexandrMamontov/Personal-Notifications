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

      // обновляем счетчики после изменения статуса карточки
      updateCounters();
    });
  });

  // функция для обновления счетчиков
  function updateCounters() {
    const unreadCards = document.querySelectorAll(".main__card:not(.read)");
    const headerText = document.querySelector(".header__text");
    const headerCount = document.querySelector(".header__icon span");
    const filterBtnSpan = document.querySelector("#filter-btn span");

    const unreadCount = unreadCards.length;

    if (unreadCount === 0) {
      headerText.textContent = "Все уведомления прочитаны";
      headerCount.textContent = "0";
      headerCount.classList.add("read");
    } else {
      headerText.textContent = `${unreadCount} непрочитанных уведомлений`;
      headerCount.textContent = unreadCount.toString();
      headerCount.classList.remove("read");
    }

    filterBtnSpan.textContent = unreadCount.toString();
  }

  // функция для фильтрации карточек
  function filterCards() {
    const activeCategoryBtn = document.querySelector(".menu__block:nth-child(1) .menu__btn.active");
    const activePriorityBtn = document.querySelector(".menu__block:nth-child(2) .menu__btn.active");
    const filterBtn = document.querySelector("#filter-btn");

    const categoryFilter = activeCategoryBtn ? activeCategoryBtn.id : "all-categories";
    const priorityFilter = activePriorityBtn ? activePriorityBtn.id : "all-priority";
    const showOnlyUnread = filterBtn.classList.contains("active");

    cards.forEach((card) => {
      let showCard = true;

      // фильтр по категориям
      if (categoryFilter !== "all-categories") {
        const cardValue = card.querySelector(".card__value");
        if (cardValue) {
          const cardCategory = cardValue.className.split(" ").find((cls) => cls !== "card__value");
          // создаем соответствие между id кнопок и классами карточек
          const categoryMapping = {
            "my-clients": "my-clients",
            communications: "communications",
            support: "support",
            analytics: "analytics",
            discipline: "discipline",
          };

          const expectedClass = categoryMapping[categoryFilter];
          if (cardCategory !== expectedClass) {
            showCard = false;
          }
        }
      }

      // фильтр по приоритетам
      if (priorityFilter !== "all-priority" && showCard) {
        const cardStatus = card.querySelector(".card__status");
        if (cardStatus) {
          const cardPriority = cardStatus.className.split(" ").find((cls) => cls !== "card__status");
          if (cardPriority !== priorityFilter) {
            showCard = false;
          }
        }
      }

      // фильтр по непрочитанным
      if (showOnlyUnread && showCard) {
        if (card.classList.contains("read")) {
          showCard = false;
        }
      }

      // показываем или скрываем карточку
      if (showCard) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // кнопки слева в меню
  const blocks = document.querySelectorAll(".menu__block");
  blocks.forEach((block) => {
    const btns = block.querySelectorAll(".menu__btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // проверяем, является ли кликнутая кнопка "filter-btn"
        if (btn.id === "filter-btn") {
          // если кнопка уже активна, убираем активный класс
          if (btn.classList.contains("active")) {
            btn.classList.remove("active");
          } else {
            // убираем активный класс у всех кнопок и добавляем активный класс к текущей
            btns.forEach((btn) => {
              btn.classList.remove("active");
            });
            btn.classList.add("active");
          }
        } else {
          // убираем активный класс у всех кнопок и добавляем активный класс к текущей
          btns.forEach((btn) => {
            btn.classList.remove("active");
          });
          btn.classList.add("active");
        }

        // применяем фильтрацию после изменения активной кнопки
        filterCards();
      });
    });
  });

  // прочитать все уведомления
  const readAllBtn = document.querySelector(".header__btn");
  readAllBtn.addEventListener("click", function () {
    cards.forEach((card) => {
      card.classList.add("read");
    });
    updateCounters();
    // применяем фильтрацию после изменения статуса всех карточек
    filterCards();
  });

  // инициализируем счетчики при загрузке страницы
  updateCounters();
});
