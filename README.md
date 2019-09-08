# Pogodynka 

Aplikacja mobilna napisana w ReactNative zczytuje dane z termometra Xiaomi Mi Temperature Humidity Monitor Bluetooth
następnie umieszcza je w bazie danych MySql za pośrednictwem API napisane w Javie.

# PogodynkaWykres

Aplikacja Webowa,napisana w React, wyswietla wykres na podstawie danych pobieranych z API napisanego w Javie, laczy sie z bazą danych w MySql.

# Cel REST API v1.
- GET	 - pobieranie danych
- PUT	 - edycja danych o indentyfikatorze
- POST - utworzenie noweg wposu
- DELETE - usuniecie wpisu o id

# Struktura bazy danych MySQL

##Tabele
- Temperature(id, value, datatime);
- Humidity(id, value, datatime);

# Przykladowe linki do REST API
- http://localhost:8000/api/temperature
- http://localhost:8000/api/humidity







