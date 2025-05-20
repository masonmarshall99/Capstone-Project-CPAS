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

help:
	@echo "Usage:"
	@echo "  make build           # Build all images"
	@echo "  make up              # Start containers"
	@echo "  make down            # Stop and remove containers"
	@echo "  make pause			  # Pauses container"
	@echo "  make start			  # Restarts a paused container"
	@echo "  make rebuild         # Rebuild and start from scratch"
	@echo "  make logs            # View container logs"
	@echo "  make shell-backend   # Open backend container shell"
	@echo "  make shell-frontend  # Open frontend container shell"
	@echo "  make migrate         # Run Django migrations"