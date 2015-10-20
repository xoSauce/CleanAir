# CleanAir COMP3001

## Backend
We're running Python/Flask with mySQL.
In order to install the dependencies, install `pip` and then run `pip install virtualenv`.
Then clone this repo, initialise the local virtual env using `virtualenv cleanairenv`.
Activate the virtual environment with `source /cleanairenv/bin/activate`, your shell name should change.
Run `/cleanairenv/bin/pip install -r requirements.txt` to install dependencies locally.

`uwsgi --ini cleanair.ini` to run with uWsgi (server for Python that we use on the AWS EC2 instance)
