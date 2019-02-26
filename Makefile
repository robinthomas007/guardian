include .env
export

config: clean src/config/index.js

src/config/index.js:
	sed "s,{{OKTA_ISSUER}},$$OKTA_ISSUER,g" src/config/index.templ.js > tmp && mv tmp $@
	sed "s,{{OKTA_CLIENT_ID}},$$OKTA_CLIENT_ID,g" $@ > tmp && mv tmp $@

clean:
	rm -f src/config/index.js

.PHONY: config clean
