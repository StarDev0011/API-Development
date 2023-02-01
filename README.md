# njcdd-account-api

This an API that represents the NJCDD Account REST API calls and responses. It is meant to run in a
Docker container in order to enable front-end development with no obstructions.

The OpenAPI (AKA Swagger) documentation is located
at https://njcdd-account-api.dev.test/api-docs or http://localhost:12100/api-docs

## Getting Started with source code

Setup: `yarn install`

Build: `yarn build`

Test:  `yarn test`

Run:   `yarn start`

## HTTPS

To make testing match production, use HTTPS calls and enable CORS on the client.
This is not necessary during development, but it is when prepping for production release.

To support HTTPS, the Developer workstation must support the following tools:

* Dnsmasq for local DNS resolution without mucking with /etc/hosts
    * See the
      article [Use dnsmasq instead of etc/hosts](https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/)

* MkCert for local self-signed certificates
    * For a mkcert intro see the
      article [How to Create Self-Signed Wildcard SSL Certificates with mkcert on MacOS](https://medium.com/@hjblokland/how-to-create-self-signed-wildcard-ssl-certificates-with-mkcert-on-macos-a6a3663aa157)
    * For a Trafik intro see the article see [The Traefik Blog](https://traefik.io/blog/traefik-2-tls-101-23b4fbee81f1/)
    * Create a self-signed wildcard certificate for the domain dev.test
