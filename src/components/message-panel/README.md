# Компонент: MessagePanel

Главный компонент, собирающий в себе другие. 

## Компонент в свою очередь разбит на несколько компонентов:
- MessagePanelHeader
- MessagePanelSearch
- MessagePanelContents
- MessagePanelContent
- MessagePanelForm

---

### Подробнее о компонентах в соответствующем компоненте.



#### MessagePanelHeader
Компонент выполняет несколько ролей. 

Первая роль состоит в показе названия выбранного канала. 
В качестве пропсов он принимает **строку**, которая приходит из Redux 

В том же компоненте содержится другой MessagePanelSearch

---

#### MessagePanelSearch
Компонент для поиска. Логики на данный момент нет.

---

#### MessagePanelContents
Компонент отрисовывает на странице сообщения. Логика внутри компонента обращается
к базе данных firebase **MESSAGES**, получая из Redux нужные данные. Для каждого объекта вызывается компонент MessagePanelContent 
Подробнее о сохранении в базу данных сообщений можно почитать на главной странице проекта. Но если кратко
сообщения сохраняются под идентификатором чата в котором сообщение писалось. Само 
сообщение сохраняется ещё под одним рандомным ключом, где уже содержится информация о самом сообщении. 

---

#### MessagePanelContent
Получает объект одного сообщений и деструктуризирует данные, такие как:
- **time**: string
- **message**: string
- **authorMessage**: object
    - **username**: string
    - **avatar**: string
    - **id**: string
    
После чего создаётся разметка для одного сообщения. Если id текущего авторизованного
пользователя равняется id написавшего сообщение - оно выделяется другим цветом.

---

#### MessagePanelHeader
Принимает в себя текущий выбранный канал. Если не выбран ни один канал, компонент отображаться не будет.
Также принимает в себя авторизованного пользователя. 

При написании сообщения - это строка, значение сохраняется в состоянии. 
При отправке оно проверяется и удаляются лишние пробелы при помощи trim(). 
Из чего состоит одно сообщение можно посмотреть выше, в MessagePanelContent.

Сообщения в канале сохраняются под ключом выбранного канала. 