FROM postgres:latest

# default user 'postgres' will be created
ENV POSTGRES_PASSWORD=devpassword

EXPOSE 5432