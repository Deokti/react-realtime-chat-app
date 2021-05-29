# ReactChat

Создание приложения для общения и, что собственно более верное описание мотивации – практика. В чате присутствует (читайте "будет") 
- Регистрация и авторизация
- Создание новых каналов (только зарегистрированные пользователи)
- Отравление как сообщений, так и изображений (изображения можно отправлять двумя способами, во-первых выбрать нажать на кнопку, она узнаётся с первого взгляда, либо через CTRL + C && CTRL + V. Вторым способом можно добавлять картинки лишь те, которые скопированы из интернета, поскольку добавлять с компьютера я в настоящее время не знаю как реализовать. Но это пока)
- Пагинация, с добавлением предыдущий сообщений по мере листания страницы вверх

Ссылка на работающее приложение: [React Chat](https://react-realtime-chat-app.web.app/login-page)

---

## Используемые технологии

### Frontend
- TypeScript
- React 
- Redux
- Router Router
- md5 (для создания хэшированного значения адреса электронной почты)
- Node-sass (для написания стилей на SCSS)
- *по мере написания будет пополняться*

### Backend
- Firebase

---

## Дополнительная информация

В данном разделе подробнее раскрывается структура самого чата. Поскольку есть шанс, что по мере создания в голове начнут переплетаться не нужное касательно какого-то функционала, было решено записывать его устройства. 

### Пользователи

При создании пользователя, то есть регистрации, происходит две вещи. Первая – это создание учётной записи в Firebase Auth. Вторая вещь – это создание в базе данных информации о зарегистрировавшемся пользователи. Они хранятся в коллекции **«USERS»**. 

Сохранение в коллекции происходит под идентификатором, который мы получаем при регистрации. Данные содержат имя и аватар пользователя.

**Базовая структура сохранения выглядит подобным образом:**

![Картинка с базовой структурой в коллекции USERS](https://raw.githubusercontent.com/Deokti/react-realtime-chat-app/channels-panel/pictures-for-readme/create-user.png)


### Каналы для общения (Чат каналы)

В настоящее время создать канал может любой зарегистрированный пользователь. Это происходит в меню, которое открывается при клике пользователя на свой аватар (автоматически даётся с помощью [gravatar](https://ru.gravatar.com/)).

В меню можно делать несколько вещей. Во-первых, изменить текущий аватар, во-вторых, что и собственное главное в данном разделе – создать новый канал. И последнее, выйти из учётной записи. При нажатии ***Создать новый канал*** появляется окно, где нужно заполнить поле с названием нового чата. При нажатии создать, данный чат сохранится в базе данных в коллекции **«CHANNELS»**.

При создании канала, создаётся его уникальный идентификатор. Под ним, созданный канал и будет сохранён в коллекции, в которой, в свою очередь будет название канала. Тип, который будет сообщать, что именно это - канал, человек или избранное. Это сделано для фильтрации. А также человек, создавший канал. *По мере написания произойдёт расширение*

**Базовая структура сохранения канала выглядит подобным образом:**

![Картинка с базовой структурой в коллекции CHANNELS](https://raw.githubusercontent.com/Deokti/react-realtime-chat-app/channels-panel/pictures-for-readme/create-channel.png)


### Сообщения
В настоящее время в приложении можно как отправить сообщение, так и добавить
какой-то вложенный файл, - картинку. Та сохраняется в storage, затем мы получаем
ссылку на файл и отправляет в базу данных сообщений. 

Сообщения хранятся в базе данных в коллекции **MESSAGES**. Сами сообщения сохраняются
в названной выше коллекции, под ключом, идентичный идентификатору канала. Если, мы например,
написали в канале React-разработка, то сообщение сохранится под ключом *-MJrXa6q-PEWVWgQqiOU*.

Поскольку нужно отображать некоторые данные, создаётся объект. 
Он состоит из: объекта с отправителем сообщения, идентификатором сообщения (выступает время в миллисекундах, полученную через Date.now(), в будущем следует переработать),
тело сообщения, адрес для получения вложенного файла, время в которое отправилось сообщение.

**Базовая структура одного сообщения выглядит подобным образом:**

![Картинка с базовой структурой в коллекции MESSAGES](https://raw.githubusercontent.com/Deokti/react-realtime-chat-app/master/pictures-for-readme/template-one-message.png)

