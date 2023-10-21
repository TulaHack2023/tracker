# API Сервис трекера задач

Для запуска вам потребуется установить [Docker](https://docs.docker.com/engine/install/)


## Настройка и установка

1. **Запустить докер**
```
$ docker-compose up -d
```

2. **Установить Nest/cli для генерации кода**
```
 $ npm install -g @nestjs/cli
```

3. **Запустить миграции**
```
$ npm run typeorm:migrate
```

4. **Запустить проект в dev режиме**
```
$  npm run start:dev
```

## Справочные материалы 
Мы используем фреймворк [Nest.js](https://docs.nestjs.com/)

В качесте БД postgresql, работа с ней осуществляется через [typeorm](https://typeorm.io/)

Полезные видосы которые помогут в работе:
- https://www.youtube.com/watch?v=9MGKKJTwicM&t=1679s

## Дизайн
Весь дизайн доступен по [ссылке](https://www.figma.com/file/6WEdin1KjoRsSD0L9NUx5N/Untitled?type=design&node-id=0%3A1&mode=design&t=rEVpgFyGO4oZDnle-1)

## Логика работы
<img src="https://media.discordapp.net/attachments/1163478433939079268/1165062548937252976/Untitled_Diagram.png?ex=65457c0d&is=6533070d&hm=89717c66a79f4eb5df035fb4bed35a8ecc2d2249db483494e443bd8f4f26020b&=&width=1429&height=786">

## Интеграция telegram
Интеграция телеграм будет происходить через библиотеку [telegraf](https://github.com/telegraf/telegraf)

## Работа с git

Работа с гит осуществляется через отдельные ветки для каждого разработчика, ветки вливаются по мере необходимости.