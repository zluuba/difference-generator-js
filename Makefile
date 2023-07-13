install:
	npm ci
	sudo npm link

reinstall:
	sudo npm link

lint:
	npx eslint .
