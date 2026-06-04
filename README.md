# LinkKeeper - Dockerized Web Application

## Описание на проекта

LinkKeeper е уеб приложение за съхранение и управление на полезни интернет ресурси (линкове). Потребителите могат да добавят нови линкове с име, URL адрес и кратко описание, които се съхраняват в MongoDB база данни.

Проектът е контейнеризиран с Docker и може да бъде стартиран изцяло чрез Docker Compose.

---

## Използвани технологии

* Node.js
* Express.js
* MongoDB
* Mongoose
* Docker
* Docker Compose

---

## Структура на проекта

```
project-root/
│
├── Dockerfile
├── compose.yml
├── .dockerignore
├── package.json
├── index.js
├── public/
│   └── index.html
│
└── README.md
```

---

## Компоненти на системата

### 1. Web Service

Контейнерът съдържа Node.js приложение, което:

* Предоставя потребителски интерфейс
* Обработва HTTP заявки
* Предоставя REST API
* Осъществява връзка с MongoDB

Порт:

```
3000
```

---

### 2. MongoDB Database

Контейнерът използва официалния образ:

```
mongo:6.0
```

Базата съхранява всички добавени линкове.

Порт:

```
27017
```

---

## Комуникация между услугите

Docker Compose създава собствена виртуална мрежа:

```
app-network
```

Уеб приложението комуникира с MongoDB чрез hostname:

```
db
```

Връзката се осъществява чрез променливата:

```env
MONGO_URI=mongodb://db:27017/linksdb
```

Когато контейнерът на приложението стартира, той се свързва към MongoDB контейнера през Docker мрежата.

---

## Docker конфигурация

### Dockerfile

Dockerfile изгражда Node.js приложението:

1. Използва официален Node.js образ.
2. Копира package.json файловете.
3. Инсталира зависимостите.
4. Копира сорс кода.
5. Отваря порт 3000.
6. Стартира приложението чрез:

```bash
node index.js
```

---

### Docker Compose

Файлът `compose.yml` дефинира:

* web контейнер
* db контейнер
* постоянен Docker volume за MongoDB
* Docker network за комуникация между услугите

---

## Изграждане и стартиране

### 1. Клониране на проекта

```bash
git clone <github-repository-url>
cd <project-folder>
```

### 2. Изграждане на контейнерите

```bash
docker compose build
```

### 3. Стартиране на проекта

```bash
docker compose up -d
```

### 4. Проверка на работещите контейнери

```bash
docker ps
```

### 5. Отваряне на приложението

В браузър:

```
http://localhost:3000
```

---

## Спиране на контейнерите

```bash
docker compose down
```

---

## Docker Hub образи

### Web Application

```
https://hub.docker.com/r/zelenazahrada1/linkkeeper-web
```

### MongoDB

Използва се официалният образ:

```
mongo:6.0
```

---

## Автор

Име: Ясмина Петрова Ричанек

Факултетен номер: 22528
