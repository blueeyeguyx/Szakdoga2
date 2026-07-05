Ez egy webalkalmazás, amely segít a felhasználóknak egy egészségesebb életmód kialakításában úgy,
hogy étrendet és edzéstervet generál nem, kor, súly, edzésre szánt idő és ételintoleranciák alapján.

Futtatás:
1. Töltsük le a Node.js-t a https://nodejs.org/en webhelyről és telepítsük fel.
2. Töltsük le a VSCode IDE-t a https://code.visualstudio.com/ webhelyről.
3. Nyissuk meg VSCode-ban a projektet a gyökérmappából (az a mappa ahol a cliens, a server és a .gitignore van)
4. Nyissunk egy terminalt (View > Terminal) és navigáljunk el oda, ahol a package.json van a cliensen belül. Itt futtassuk az "npm install" parancsot, ezzel az összes package telepítődik
5. Ismételjük ezt meg a server mappában is
6. Hozzunk létre egy mongodb adatbázist. Töltsük fel gyakorlatokkal és ételekkel (a séma a server>src>models-ben van)
7. Hozzunk létre egy .env fájlt a server mappában és írjuk bele ezt:
MONGO_URI = <ide az adatbázisunk connection stringjét>
PORT = <ide az adatbázisunk connection portját, ez alapesetben 5000>
JWT_SECRET = <ide akármit ami hosszú, nyugodtan zongorázzuk végig a billentyűzetet>
8. Ha elmentettük a .env fájlt, navigáljunk el a szerver mappájába és futtassuk az "npm run dev" parancsot. Egy másik terminálban navigáljunk el a cliens mappájába és ott is futtassuk az "npm run dev" parancsot


A program fejlesztése során megtanultam hogyan kell helyesen struktúrálni a kódot, megértettem a requestek és response-ok működését,
megértettem hogy működnek a pipeline-ok, hiszen nagyon sokat írtam meg. Megismerkedtem a mongoose sémákkal, kibővült a .json fájlokkal
való munkához a tudásom, illetve az adatbázisban lévő értékek módosítása, a fióknyitás és bejelentkezés, valamint a projekt konfigurációs
fájljainak kezelése is sokkal könnyebben megy, mint eddig. 

Használt technológiák:
- Javascript
- React
- Vite
- Jwt
- Konfigurációs fájlok
- Node.js
- MongoDB
- Mongoose séma





