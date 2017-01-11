# Boolfy calculator

Минималистичный калькулятор для расчёта булевых функций.

## Установка

(!!!Данный способ описывает установку для ОС Ubuntu, если вы хотите использовать калькулятор на другой ОС, способ развёртки может отличаться!!!)

   * В первую очередь требуется наличие NodeJS и менеджера пакетов для него NPM. Для этого нужно открыть терминал и выполнить:

   ```bash
   $  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
   $  sudo apt-get install -y nodejs
   $  sudo apt-get install -y build-essential
   ```
   * Затем нужно перейти в директорию, в которую вы хотите установить Boolfy calculator
   * Скачиваете архив с репозиторием и распаковываете его в текущую папку, либо клонируете его командой:

   ```bash
   $ git clone https://github.com/EugenLeshchov/Boolfy-calculator.git
   ```
   * Перейти в директорию со скачанным репозиторием:

   ```
   $ cd 'Boolfy-calculator'
   ```
   * Выполнить установку дополнительных пакетов командой:

   ```bash
   $ npm install
   ```

## Запуск приложения

   * Выполнить в терминале:

   ```bash
   $ npm start
   ```
   * И перейти в браузере по адресу
   ```
    localhost:8080
   ```

## Руководство пользователя
   ![Screenshot](https://github.com/EugenLeshchov/Boolfy-calculator/blob/screenshots/screenshots/boolfy-mainpage-edited.png "main page")
   ![Screenshot](/../screenshots/path/to/boolfy-results-edited.png?raw=true "results table")
