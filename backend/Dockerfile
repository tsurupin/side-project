# Alias this container as builder:
FROM bitwalker/alpine-elixir-phoenix as builder

ARG HOST
ARG PORT
ARG PHOENIX_SECRET_KEY_BASE
ARG AWS_S3_BUCKET
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG POSTGRES_DB_URL
ARG POSTGRES_DB_POOL_SIZE
ARG FIREBASE_SECRET_PEM_FILE_PATH
ARG FIREBASE_SERVICE_ACCOUNT_EMAIL


ENV MIX_ENV=prod \
    HOST=$HOST \
    PORT=$PORT \
    PHOENIX_SECRET_KEY_BASE=$PHOENIX_SECRET_KEY_BASE \
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
    POSTGRES_DB_URL=$POSTGRES_DB_URL \
    POSTGRES_DB_POOL_SIZE=$POSTGRES_DB_POOL_SIZE \
    FIREBASE_SECRET_PEM_FILE_PATH=$FIREBASE_SECRET_PEM_FILE_PATH \
    FIREBASE_SERVICE_ACCOUNT_EMAIL=$FIREBASE_SERVICE_ACCOUNT_EMAIL
WORKDIR /backend

RUN echo $PORT
# Copy ssl files into builder container tmp folder
# RUN mkdir tmp
# RUN aws s3 sync s3://$OPENSUBS_S3_SECRETS_BUCKET/ssl tmp

# Umbrella
COPY mix.exs mix.lock ./
COPY config config


# Apps
COPY apps apps
RUN mix do deps.get, deps.compile

WORKDIR /backend
COPY rel rel

RUN mix release --env=prod --verbose

### Release

FROM alpine:3.6

# We need bash and openssl for Phoenix
RUN apk upgrade --no-cache && \
    apk add --no-cache bash openssl

ENV MIX_ENV=prod \
    REPLACE_OS_VARS=true \
    SHELL=/bin/bash

WORKDIR /backend

COPY --from=builder /backend/_build/prod/rel/backend/releases/0.1.0/backend.tar.gz .

RUN tar zxf backend.tar.gz && rm backend.tar.gz
RUN ls -d "$PWD"/* 

CMD ["/backend/bin/backend", "foreground"]