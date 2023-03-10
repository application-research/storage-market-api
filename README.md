# STORAGE_MARKET_API

docs: https://data.storage.market

To run it, you need to connect to our intelligence database (prod only). You can make your own though we won't stop you.

```
DOCUMENT_DATABASE_NAME=xxxx
DOCUMENT_DATABASE_USERNAME=xxxx
DOCUMENT_DATABASE_HOST=xxxx
DOCUMENT_DATABASE_PORT=5432
DOCUMENT_DATABASE_PASSWORD=xxxx
IEX_CLOUD_PUBLIC_KEY=xxxx
```

### Running a local Development Database

A docker file is provided to make it easy to set up a local development database for testing.
To do this,

1. Ensure you have Docker installed and running
2. Run the db start script `.dev/start.sh`
3. Source the environment file, which will cause the app to connect to the dev db, `source .dev/dev.env`

You can stop the dev db by running `.dev/stop.sh`

#### Purging the dev DB

DB tables will be persisted via a docker volume. You can purge all tables/data from the dev db by running

1. `.dev/purge.sh`
2. `.dev/start.sh` (re-creates container)
3. `.dev/start.sh` (run it a second time to start it up)

### Setup (MacOS)

Once you have environment variables specified, run the server

```sh
npm install
npm run dev
```

### Scripts

If you need to run node script without running the server, use this example to get started

```sh
# creates the tables you need
npm run script create

# updates the tables
npm run script update

# scans for database, typically a daily cron job
npm run script scan

# analysis, typically a daily cron job.
npm run script analysis
```
