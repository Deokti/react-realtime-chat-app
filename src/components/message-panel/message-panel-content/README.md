# Компонент MessagePanelContent

Компонент является функциональным компонентом, создающим базовую структуру одного сообщения.

Принимает **message**, которое является объектом и описан в **TMessage**. 

<pre>
<code>
    TMessage = {
      id: string
      time: string
      messageContent: string
      fileMessageURL: string
      authorMessage: {
        username: string
        avatar: string
        id: string
      }
    }
</code>
</pre>


Также принимает текущего пользователя - **logInUser**.

С их помощью проводится проверка: если идентификаторы одинаковые, сообщение выделяется другим цветом.
Проводятся несколько проверок:
1. Если есть url в fileMessageURL есть, создаётся img, добавляется новый класс и MessagePanelFullpage,
который позволяет посмотреть картинку в *полном* разрешении. 
2. Если есть messageContent создается p (параграф).



