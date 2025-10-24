.PHONY: up down build rebuild backend frontend logs shell help migrate pause start

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

pause:
	docker compose stop

start:
	docker compose start

rebuild: down build up

logs:
	docker compose logs -f

shell-backend:
	docker compose exec backend sh

shell-frontend:
	docker compose exec frontend sh

migrate:
	docker compose exec backend python manage.py migrate

deploy:
	docker compose -f docker-compose-deploy.yml up -d --build;
	docker compose -f docker-compose-deploy.yml exec backend python manage.py makemigrations;
	docker compose -f docker-compose-deploy.yml exec backend python manage.py migrate;
	docker compose -f docker-compose-deploy.yml exec backend python manage.py collectstatic --noinput;

deploy-down:
	docker compose -f docker-compose-deploy.yml down

help:
	@echo "Usage:"
	@echo "  make build           # Build all images"
	@echo "  make up              # Start containers"
	@echo "  make down            # Stop and remove containers"
	@echo "  make rebuild         # Rebuild and start from scratch"
	@echo "  make logs            # View container logs"
	@echo "  make shell-backend   # Open backend container shell"
	@echo "  make shell-frontend  # Open frontend container shell"
	@echo "  make migrate         # Run Django migrations"
	@echo "  make deploy          # Deploy application with production settings"
	@echo "  make deploy-down     # Stop and remove deployed containers"