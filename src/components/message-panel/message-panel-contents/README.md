#### Компонент MessagePanelContents

Имеет несколько props: 
- **currentActiveChannel**, - текущий выбранный канал. Всё что нам от него нужно, это идентификатор, 
благодаря которому произойдёт обращение к базе данных
- **logInUser**, - текущий пользователь. Нужен для проверки в useEffect.
- **messageRef**, - ссылка на коллекцию, от которой и будет происходить получение

В компоненте проводится логика получения данных, в зависимости от выбранного канала, мы получаем его сообщения и 
отрисовываем их на странице на каждой итерации вызывая и передавая нужные данные **MessagePanelContent**.

