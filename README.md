# CleanAir COMP3001

## Backend
We're running Python/Flask with mySQL.
In order to install the dependencies, install `pip` and then run `pip install virtualenv`.
Then clone this repo, initialise the local virtual env using `virtualenv cleanairenv`.
Activate the virtual environment with `source ./cleanairenv/bin/activate`, your shell name should change.
Run `./cleanairenv/bin/pip install -r requirements.txt` to install dependencies locally.

`uwsgi --ini cleanair.ini` to run with uWsgi (server for Python that we use on the AWS EC2 instance)

## Frontend
### Setup
`./frontend` folder for frontend ;)

`npm install` to get gulp and all dependencies

### Development

Edit `app.jsx` file to change the app, `require('')` some modules and elements.

Pages/components are in `/components`.

`gulp watch` to serve React app in development

`gulp` runs the browserify task

We're using Bootstrap for styles.
