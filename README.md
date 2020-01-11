# Pogodynka 

<p>Aplikacja mobilna napisana w ReactNative zczytuje dane z termometra Xiaomi Mi Temperature Humidity Monitor Bluetooth
następnie umieszcza je w bazie danych MySql za pośrednictwem API napisane w Javie.</p>
Autorzy:<br>
Front-end: <a href="https://www.linkedin.com/in/konradhanus/">Konrad Hanus</a><br>
Back-end: <a href="https://www.linkedin.com/in/maciej-dziagacz/">Maciej Dziagacz</a>

# Mobile
## Jak uruchomić
 1. zainstaluj node.js ze strony https://nodejs.org/en/
 2. wejdź do folderu mobile ```cd mobile```
 3. ```npm install``` 
 4. ```npm run android``` lub ```npm run ios```
 
# Desktop - Pogodynka Wykres

Aplikacja Webowa,napisana w React, wyswietla wykres na podstawie danych pobieranych z API napisanego w Javie, laczy sie z bazą danych w MySql.

## Jak uruchomić
1. zainstaluj node.js ze strony https://nodejs.org/en/
2. wejdź do folderu desktop ```cd desktop```
3. ```npm install```
4. ```npm start ```

# Backend 

Napiasany w strukturze REST API, pełna dokumentacja po uruchomieniu projektu

## Struktura bazy danych MySQL
## Tabele
- Temperature(id, value, datetime);
- Humidity(id, value, datetime);

## Przykladowe linki do REST API
- http://localhost:8080/api/temperature
- http://localhost:8080/api/humidity

## Jak uruchomić
1. Zainstaluj Gradle: <a href="https://docs.gradle.org/current/userguide/installation.html"> instrukcja</a>
2. Wejdż do katalogu backend ```cd backend```
3. Uruchom ```./gradlew bootRun```

## Dokumentacja
Wejdź na stronę <a href="http://localhost:8080/swagger-ui.html">http://localhost:8080/swagger-ui.html</a>







