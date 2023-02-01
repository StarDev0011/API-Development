# njcdd-account-api

This an API that represents the NJCDD Account REST API calls and responses. It is meant to run in a
Docker container in order to enable front-end development with no obstructions.

The OpenAPI (AKA Swagger) documentation is located
at https://njcdd-account-api.dev.test/api-docs or http://localhost:12100/api-docs

## Prerequisites

We attempt to make this match production so the calls as HTTPS and the client must enable CORS.
The Developer workstation must support the following tools:

* Dnsmasq for local DNS resolution without mucking with /etc/hosts
    * See https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/
    * Set DNS name to njcdd-account-api
* MkCert for local self-signed certificates
    *
  see https://medium.com/@hjblokland/how-to-create-self-signed-wildcard-ssl-certificates-with-mkcert-on-macos-a6a3663aa157
    * see https://traefik.io/blog/traefik-2-tls-101-23b4fbee81f1/
    * Create a self-signed wildcard certificate for the domain dev.test

## Getting Started and using source code

| Purpose               | Command to Run        | Comments                                         |
|-----------------------|-----------------------|--------------------------------------------------|
| Dev Setup             | `yarn install`        |                                                  |
| Build from Typescript | `yarn build`          |                                                  |
| Increment Version     | `yarn build-patch`    | Mandatory to Git Commit before Increment         |
|                       | `yarn build-minor`    | All increments will apply Git Tag                |
|                       | `yarn build-major`    |                                                  |
| Run Test Cases        | `yarn test`           | Runs all unit-test cases                         |
| Run Local Service     | `yarn start`          | Run this service locally for Dev purposes        |
| Docker Build          | `yarn docker-release` | Increment version before Docker build for deploy |
| Docker Deploy         | `yarn docker-deploy`  | Run deploy after you're sure of your build       |

Do not increment version before every build. Only increment when preparing to deploy.
