# Alias this container as builder:
FROM bitwalker/alpine-elixir-phoenix as builder

# Install aws cli and yarn
RUN apk --no-cache update && \
    apk --no-cache add python py-pip py-setuptools ca-certificates groff less && \
    pip --no-cache-dir install awscli && \
    apk --no-cache add yarn && \
    rm -rf /var/cache/apk/*

ARG HOST
ARG ERLANG_COOKIE
ARG ROLLBAR_ACCESS_TOKEN
ARG SENDGRID_API_KEY
ARG SUBS_ADMIN_EMAIL
ARG PHOENIX_SECRET_KEY_BASE
ARG SESSION_COOKIE_NAME
ARG SESSION_COOKIE_SIGNING_SALT
ARG SESSION_COOKIE_ENCRYPTION_SALT
ARG GUARDIAN_SECRET_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG OPENSUBS_S3_SECRETS_BUCKET
ARG DATABASE_URL


ENV MIX_ENV=prod \
    SUBS_WEB_KEYKEY=/etc/letsencrypt/live/$HOST/privkey.pem \
    SUBS_WEB_CERTFILE=/etc/letsencrypt/live/$HOST/cert.pem \
    SUBS_WEB_CACERTFILE=/etc/letsencrypt/live/$HOST/chain.pem \
    HOST=$HOST \
    ERLANG_COOKIE=$ERLANG_COOKIE \
    ROLLBAR_ACCESS_TOKEN=$ROLLBAR_ACCESS_TOKEN \
    SENDGRID_API_KEY=$SENDGRID_API_KEY \
    SUBS_ADMIN_EMAIL=$SUBS_ADMIN_EMAIL \
    PHOENIX_SECRET_KEY_BASE=$PHOENIX_SECRET_KEY_BASE \
    SESSION_COOKIE_NAME=$SESSION_COOKIE_NAME \
    SESSION_COOKIE_SIGNING_SALT=$SESSION_COOKIE_SIGNING_SALT \
    SESSION_COOKIE_ENCRYPTION_SALT=$SESSION_COOKIE_ENCRYPTION_SALT \
    GUARDIAN_SECRET_KEY=$GUARDIAN_SECRET_KEY \
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
    OPENSUBS_S3_SECRETS_BUCKET=$OPENSUBS_S3_SECRETS_BUCKET \
    DATABASE_URL=$DATABASE_URL

WORKDIR /backend


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

CMD ["/backend/bin/backend", "foreground"]