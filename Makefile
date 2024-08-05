.PHONY: stop clean enter dev

stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -a

enter:
	docker exec -it $(target) sh

dev: 
	docker compose --env-file .dev.env -f compose.yaml -f compose.dev.yaml up -d

# test:
# 	docker compose --env-file .dev.env -f compose.yaml -f compose.test.yaml up -d
