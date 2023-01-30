#!/usr/bin/env bash

# Version
echo "Version"
curl http://localhost:3000/api/v1/version

# Access
printf "\n\n"
echo "Authenticate Success"
curl -X POST -H "Content-Type: application/json" \
  -d '{"userName": "admin@njcdd.org", "password": "admin"}' \
  http://localhost:3000/api/v1/access/authenticate

printf "\n\n"
echo "Authenticate Fail"
curl -X POST -H "Content-Type: application/json" \
  -d '{"userName": "admin@njcdd.org", "password": "notgood"}' \
  http://localhost:3000/api/v1/access/authenticate

printf "\n\n"
echo "Register Success"
curl -X POST -H "Content-Type: application/json" \
  -d '{"userName": "new@njcdd.org", "firstName": "New", "lastName": "Person"}' \
  http://localhost:3000/api/v1/access/register
