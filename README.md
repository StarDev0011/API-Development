# njcdd-account-api

This an API that represents the NJCDD Account REST API calls and responses. It is meant to run in a
Docker container in order to enable front-end development with no obstructions.

The OpenAPI (AKA Swagger) documentation is located
at https://njcdd-account-api.dev.test/api-docs or http://localhost:12100/api-docs

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
