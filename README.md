### AuthenticationApp

Python Version: 3.7 or above
Database: Postgres, version 14.3

### Project setup
 
 - `pip install -r requirements.txt`
 - copy `.venv_sample` from `/config` to project root directory as `.venv`
 - make changes to `.venv`
 - copy `.env_sample` from `/config` to `/src/authentication_app` directory
 - make changes to `.env_sample`
 - run `source .venv`

### database setup
 - install postgres database [from here](https://www.postgresql.org/download/)
 - `sudo -su posgres`
 - `psql`
 - `create database authentication_app`
