This is my personal website that I will be coding over the summer of 2025.

<!-- in wsl -->

<!-- first time running locally, install dependencies -->
npm install

<!-- start locally -->
npm start

<!-- build to deploy to website -->
npm build

<!-- start backend, in backend folder: -->
python3 -m venv venv    // first time
source venv/bin/activate 

<!-- in the venv -->
python manage.py runserver

<!-- adding new parks/images to database -->
python manage.py load_parks

<!-- for changes to the model -->
python manage.py makemigrations
python manage.py migrate