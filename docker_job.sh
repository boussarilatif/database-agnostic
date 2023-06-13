#!/bin/bash

# Start PostgreSQL container
docker run -d \
  --name postgres-container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=book_database \
  -p 5432:5432 \
  postgres

# Start MongoDB container
docker run -d \
  --name mongodb-container \
  -e MONGO_INITDB_ROOT_USERNAME=docker \
  -e MONGO_INITDB_ROOT_PASSWORD=mongopw \
  -e MONGO_INITDB_DATABASE=book_database \
  -p 55000:27017 \
  mongo
