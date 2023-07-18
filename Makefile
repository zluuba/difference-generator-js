install:
	npm ci
	sudo npm link

reinstall:
	sudo npm link

lint:
	npx eslint .

test:
	npx jest

test-full:
	npx jest --watchAll

diff:
	gendiff __fixtures__/nested1.json __fixtures__/nested2.json

diff-raw:
	gendiff __fixtures__/nested1.json __fixtures__/nested2.json -f json
