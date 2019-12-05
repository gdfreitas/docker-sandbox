#!/bin/sh
docker service create --name psql --secret psql_user --secret psql_pass \
  -e POSTGRES_PASSWORD_FILE=/run/secrets/psql_pass \
  -e POSTGRES_USER_FILE=/run/secrets/psql_user \
  postgres
