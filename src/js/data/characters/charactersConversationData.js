const charactersConversationData = {
  lida: {
    messages: [
      {
        id: 1,
        text: 'Ходят здесь, мусорят - покусаю, ё-моё!!! Почему я за вами должна убирать?! Мне что больше всех надо? Идите на своё рабочее место! Нечего здесь ходить!!!... Вечно придут, наср*т, и не убирают! А я потом получаю! Оце ж и дома такэ!.. Я в следующий раз загорожу всё и ходите через улицу - мне всё равно!!! Что это такое??? Разве можно так?! Нина! Нина-а-а!!! Нина Григорьевна! Только мешают работать и всё! Никакой пользы от них... не нравится - я пойду на овощи! Становитесь и сами работайте здесь! В этом свинюшнике. Что это такое?! Вот что это???  Вы что не знаете где оно должно лежать?!! Как так можно? - не понимаю!.. Как в таких условиях можно работать? А потом - Лида то, Лида сё!.. Убирайте сейчас же!!! И не ходите здесь! Что не понятного??? Сто раз говорила уже!!! Не доходит что-ли? Что за люди...',
      },
      {
        id: 2,
        text: 'Спасибо! Как дела? А обнимашки? Почему ты со мной не разговариваешь???',
      },
    ],
    buttons: [
      {
        key: 'give_chocolate',
        content: 'дать шоколадку',
        classNames: ['button'],
        onClick: function () {
          console.log('дать шоколадку');
          this.chooseMessage(2);
          this.buttonsRefs.forEach((button) => {
            if (button.dataset.key === 'continue') {
              button.removeAttribute('disabled');
            } else {
              button.setAttribute('disabled', 'true');
            }
          });
        },
      },
      {
        key: 'call_bohdan',
        content: 'позвать Богдана',
        classNames: ['button'],
        onClick: function () {
          console.log('позвать Богдана');

          this.buttonsRefs.forEach((button) => {
            if (button.dataset.key === 'continue') {
              button.removeAttribute('disabled');
            } else {
              button.setAttribute('disabled', 'true');
            }
          });
        },
      },
      {
        key: 'continue',
        content: 'продолжить',
        attributes: [{ disabled: true }],
        classNames: ['button'],
        onClick: function () {
          console.log('продолжить');

          this.close();
        },
      },
    ],
  },
  nata1: {
    messages: [
      {
        id: 1,
        text: 'Забираем кашу!',
      },
    ],
    buttons: [
      {
        key: 'continue',
        content: 'продолжить',
        classNames: ['button'],
        onClick: function () {
          console.log('продолжить');

          this.close();
        },
      },
    ],
  },
};

export { charactersConversationData };
