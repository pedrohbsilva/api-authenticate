SHELL := /bin/bash
include .env

run-app:
	docker-compose up --build

run-stop:
	docker-compose down

run-prune:
	docker-compose -f docker-compose down

heroku_create:
	heroku create

heroku_login:
	heroku container:login

heroku_postgres_create:
	heroku addons:create heroku-postgresql:hobby-dev --app $(HEROKU_HOST)

heroku_registry:
	docker build -f Dockerfile.prod -t registry.heroku.com/$(HEROKU_HOST)/web .

heroku_push:
	docker push registry.heroku.com/$(HEROKU_HOST)/web:latest

heroku_release:
	heroku container:release web --app $(HEROKU_HOST)

heroku_migrate:
	heroku run yarn migration:run

heroku_swagger:
	heroku run yarn swagger

heroku_logs:
	heroku logs --app $(HEROKU_HOST)

heroku_token:
	heroku auth:token
