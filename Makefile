SHELL := /usr/bin/bash

settings.json: config.yml
	./generate_settings.py > $@
