# NJCDD-API Mock

This an API that represents the NJCDD REST API calls and responses. It is meant to run in a
Docker container and enable front-end development with no obstructions.

The OpenAPI (AKA Swagger) documentation is located at https://njcdd-api.dev.test/api-docs

## Prerequisites

We make every effort to make this match production so the calls as HTTPS and the client must enable CORS.
The Developer workstation must support the following tools:

* Dnsmasq for local DNS resolution without mucking with /etc/hosts
    * (see https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/)
* MkCert for local self-signed certificates
    * (
      see https://medium.com/@hjblokland/how-to-create-self-signed-wildcard-ssl-certificates-with-mkcert-on-macos-a6a3663aa157)
    * (see https://traefik.io/blog/traefik-2-tls-101-23b4fbee81f1/)
