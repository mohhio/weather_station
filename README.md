# Pogodynka 

Aplikacja mobilna napisana w ReactNative zczytuje dane z termometra Xiaomi Mi Temperature Humidity Monitor Bluetooth
następnie umieszcza je w bazie danych MySql za pośrednictwem API napisane w Javie.

# Mobile
## Jak uruchomić
 - zainstaluj node.js 
 

# Desktop - Pogodynka Wykres

Aplikacja Webowa,napisana w React, wyswietla wykres na podstawie danych pobieranych z API napisanego w Javie, laczy sie z bazą danych w MySql.

## Jak uruchomić
1. zainstaluj node.js ze strony https://nodejs.org/en/
2. wejdź do folderu desktop ```cd desktop```
3. ```npm install```
4. ```npm start ```

# Backend 

## Cel REST API v1.
- GET	 - pobieranie danych
- PUT	 - edycja danych o indentyfikatorze
- POST - utworzenie noweg wposu
- DELETE - usuniecie wpisu o id

## Struktura bazy danych MySQL

##Tabele
- Temperature(id, value, datetime);
- Humidity(id, value, datetime);

## Przykladowe linki do REST API
- http://localhost:8000/api/temperature
- http://localhost:8000/api/humidity







