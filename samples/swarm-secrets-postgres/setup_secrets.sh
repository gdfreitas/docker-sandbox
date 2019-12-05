#!/bin/sh
docker secret create psql_user psql_user.txt &&
echo "myDBPassword" | docker secret create psql_pass -

