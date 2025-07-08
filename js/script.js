document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".main__card");
  const hiddenCards = new Set(); // Используем Set для хранения скрытых карточек

  // Функция для обновления счетчиков
  function updateCounters() {
    const unreadCards = document.querySelectorAll(".main__card:not(.read)");
    const headerText = document.querySelector(".header__text");
    const headerCount = document.querySelector(".header__icon span");
    const filterBtnSpan = document.querySelector("#filter-btn span");
    const hiddenBtnSpan = document.querySelector("#hidden-btn span");

    const unreadCount = unreadCards.length;
    const hiddenCount = hiddenCards.size;

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
    hiddenBtnSpan.textContent = hiddenCount.toString();
  }

  // Функция для фильтрации карточек
  function filterCards() {
    const activeCategoryBtn = document.querySelector(".menu__block:nth-child(1) .menu__btn.active");
    const activePriorityBtn = document.querySelector(".menu__block:nth-child(2) .menu__btn.active");
    const filterBtn = document.querySelector("#filter-btn");
    const hiddenBtn = document.querySelector("#hidden-btn");

    const categoryFilter = activeCategoryBtn ? activeCategoryBtn.id : "all-categories";
    const priorityFilter = activePriorityBtn ? activePriorityBtn.id : "all-priority";
    const showOnlyUnread = filterBtn.classList.contains("active");
    const showOnlyHidden = hiddenBtn.classList.contains("active");

    cards.forEach((card) => {
      let showCard = true;

      // Фильтр по категориям
      if (categoryFilter !== "all-categories") {
        const cardValue = card.querySelector(".card__value");
        if (cardValue) {
          const cardCategory = cardValue.className.split(" ").find(cls => cls !== "card__value");
          const categoryMapping = {
            "my-clients": "my-clients",
            "communications": "communications",
            "support": "support",
            "analytics": "analytics",
            "discipline": "discipline"
          };
          const expectedClass = categoryMapping[categoryFilter];
          if (cardCategory !== expectedClass) {
            showCard = false;
          }
        }
      }

      // Фильтр по приоритетам
      if (priorityFilter !== "all-priority" && showCard) {
        const cardStatus = card.querySelector(".card__status");
        if (cardStatus) {
          const cardPriority = cardStatus.className.split(" ").find(cls => cls !== "card__status");
          if (cardPriority !== priorityFilter) {
            showCard = false;
          }
        }
      }

      // Фильтр по непрочитанным
      if (showOnlyUnread && showCard) {
        if (card.classList.contains("read")) {
          showCard = false;
        }
      }

      // Фильтр по скрытым
      if (showOnlyHidden) {
        if (!hiddenCards.has(card)) {
          showCard = false;
        }
      } else {
        if (hiddenCards.has(card)) {
          showCard = false;
        }
      }

      // Показываем или скрываем карточку
      if (showCard) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Обработчик клика по карточке
  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // Проверяем, был ли клик по кнопке скрытия
      if (event.target.classList.contains("card__hidden")) {
        event.stopPropagation(); // Предотвращаем срабатывание обработчика клика по карточке
        if (hiddenCards.has(card)) {
          hiddenCards.delete(card);
          card.classList.remove("hidden");
          event.target.title = "Скрыть уведомление";
        } else {
          hiddenCards.add(card);
          card.classList.add("hidden");
          event.target.title = "Показать уведомление";
        }
        updateCounters();
        filterCards();
      } else {
        const wasActive = card.classList.contains("active");
        cards.forEach((c) => c.classList.remove("active"));
        if (!wasActive) {
          card.classList.add("read");
          card.classList.add("active");
        }
        updateCounters();
      }
    });
  });

  // Кнопки слева в меню
  const blocks = document.querySelectorAll(".menu__block");
  blocks.forEach((block) => {
    const btns = block.querySelectorAll(".menu__btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (btn.id === "filter-btn" || btn.id === "hidden-btn") {
          if (btn.classList.contains("active")) {
            btn.classList.remove("active");
          } else {
            btns.forEach((b) => {
              if (b.id === "filter-btn" || b.id === "hidden-btn") {
                b.classList.remove("active");
              }
            });
            btn.classList.add("active");
          }
        } else {
          btns.forEach((b) => {
            if (b.id !== "filter-btn" && b.id !== "hidden-btn") {
              b.classList.remove("active");
            }
          });
          btn.classList.add("active");
        }
        filterCards();
      });
    });
  });

  // Прочитать все уведомления
  const readAllBtn = document.querySelector(".header__btn");
  readAllBtn.addEventListener("click", function () {
    cards.forEach((card) => {
      card.classList.add("read");
    });
    updateCounters();
    filterCards();
  });

  // Инициализируем счетчики при загрузке страницы
  updateCounters();
  filterCards();
});