//Гайд по запуску

//Ввімкнути докер
cd docker
docker-compose up -d
docker cp ./superheroes_backup.sql superhero-db:/backup.sql
docker exec -it superhero-db bash -c "psql -U postgres -d superheroes -f /backup.sql"
//Має з'явитись COPY 11, якщо ні треба перевірити кодування (має бути UTF-8)


//В головній папці:
npm install

//Знову з головної папки:
cd server
npm run start:dev

//З головної папки:
cd client-vite
npm run dev

/На цьому етапі все працює
/Можна заходити на http://localhost:1234/


//Для тестування бекенду(юніт тести валідації + інтеграція моделі):
cd server
npm run jest 


//Далі потрібен пайтон
//Спрацює тільки коли все вищеописане зроблено + потрібен буде ключ для джеміні
//Для тестування фронту(Е2Е):
cd client-vite
cd QA
cd E2E
//В цій папці потрібно додати в .env ключ джеміні згенерований на https://aistudio.google.com/apikey
python -m venv venv
venv/scripts/activate
pip install -r requirements.txt
python E2E_Run.py
//Відкриється Chromium і ви побачите як все гарненько саме понатискається.
//Що саме відбувалось буде в промті в файлі E2E_Run.py. Також в розгорнотому вигляді все буде в консолі.
