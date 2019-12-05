#!/bin/sh
docker run \
  -v $(pwd)/in:/app/in \
  -v $(pwd)/out:/app/out \
  --env CHARCOAL_FACTOR=10 \
  mta
