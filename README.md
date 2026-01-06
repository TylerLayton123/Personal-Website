This is my personal website that I will be coding over the summer of 2025.

- in wsl

- first time running locally, install dependencies
npm install

- start locally
npm start

- build to deploy to website
npm build

- start backend, in backend folder:

- first time:
python3 -m venv venv    

source venv/bin/activate 

- in the venv:
python manage.py runserver

- adding new parks/images to database:
python manage.py load_parks

- for changes to the model:
python manage.py makemigrations
python manage.py migrate


- load or delete parks into backend, (in venv)
python manage.py load_parks
python manage.py delete_all_parks.py



- on server in backend
need to copy large link from cPanel site

- start python venv from line in email

- access databse using
psql -h localhost -U tjlayton_user -d tjlayton_db 