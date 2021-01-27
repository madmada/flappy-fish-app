Flappy-fish
============================
## Opis 
FlappyFish to interaktywna gra przeglądarkowa, stworzona dla użytkowników komputerów i laptopów. Jej zasady są oparte na założeniach popularnej niegdyś gry zręcznościowej ‘Flappy Bird’, w której ruch horyzontalny obiektu symulowany jest za pomocą przesuwającego się tła.

Zadaniem gracza jest omijanie przeszkód poprzez ruch wertykalny obiektu przypominający skok, inicjalizowany naciśnięciem spacji. Każde pokonanie przeszkody skutkuje dodaniem jednego punktu. Przy starcie aplikacji gracz podaje swoją nazwę, natomiast po zakończonej rozgrywce dostępny jest ekran z podsumowaniem, prezentujący uzyskany wynik. Gracz ma dostęp również do wyświetlenia tabeli prezentującej 15 najlepszych wyników.

## Instalacja i Uruchomienie
Do poprawnego zainstalowania projektu wymagane jest wykorzystanie kilku narzędzi:
- node (node -v)
- yarn (yarn -v)
- python (python --version) lub python3
- pip (pip --version) lub pip3
- flask (flask --version)

Instalację i pobranie niezbędnych zależności wykonujemy z wykorzystaniem:
- `yarn install` (w folderze flappy-fish-app)
- `pip install flask-cors` (w folderze flappy-fish-api)

#### Lokalne uruchomienie serwera: 
W folderze flappy-fish-api wykonać skrypt`./run.sh` lub `./run.bat`.

Wykonanie skryptu run spowoduje stworzenie bazy danych w folderze instance o nazwie flappy.sqlite.

#### Uuchomienie lokalnie aplikacji
Bedąc w folderze flappy-fish-app wpisać w konsoli: `yarn start`

Aplikacja zostanie uruchomiona pod adresem [http://localhost:3000](http://localhost:3000).


## Struktura aplikacji
#### Aplikacja frontowa

    .
    ├── ...
    ├── app                    
    │   ├── components            # Główne komponenty
    │   │   ├── Menu              # Wynik po zakończeniu rundy, najlepsze wyniki,
    │   │   │                       zmiana nazwy gracza
    │   │   ├── Pipe              # Przeszkody, które gracz ma za zadanie omijać
    │   │   ├── Player            # Obiekt gracza
    │   │   ├── Player            # Obiekt gracza
    │   │   └── PlayerNameModal   # Modal z formularzem zmiany nazwy gracza
    │   ├── App.js                # Główna logika gry
    │   └── App.helper.js         # Stałe aplikacji, funkcje pomocnicze
    └── ...



#### Serwer
    .
    ├── ...
    ├── flappy            
    │   ├── db.py         # Przygotowanie połączenie z bazą danych
    │   ├── __init__.py   # Główny skrypt, konfigurujący aplikację
    │   ├── result.py     # Klasa rezultat
    │   └── schema.sql    # Plik z bazą - podczas startu aplikacji
    └── run.sh            # Skrypt uruchomieniowy serwera

