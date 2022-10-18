/* Выход из кабинета */
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(f => location.reload());
}

/* Информация о пользователе */
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

/* Курс валют */
const ratesBoard = new RatesBoard();

let requestCourse = () => ApiConnector.getStocks(response => {
  if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  }
});

setInterval(requestCourse(), 60000);

/* Операции с деньгами */
const moneyManager = new MoneyManager();

/* Пополнение */
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Выполнено успешно!`);
    } else {
      moneyManager.setMessage(response.false, `Ошибка!`);
    }
  })
}

/* Конвертация */
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Выполнено успешно!`);
    } else {
      moneyManager.setMessage(response.false, `Ошибка!`);
    }
  })
}

/* Перевод */
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, `Выполнено успешно!`);
    } else {
      moneyManager.setMessage(response.false, `Ошибка!`);
    }
  })
}

/* Работа с избранным */
const favoritesWidget = new FavoritesWidget();

/* Начальный список избранного */
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

/* Добавить в избранное */
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, `Пользователь добавлен!`);
    } else {
      favoritesWidget.setMessage(response.false, `Не удалось добавить пользователя!`);
    }
  })
}

/* Удалить из избранного */
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, `Пользователь удален!`);
    } else {
      favoritesWidget.setMessage(response.false, `Не удалось удалить пользователя!`);
    }
  })
}