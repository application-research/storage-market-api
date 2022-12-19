# STORAGE_MARKET_API

docs: https://data.storage.market

To run it, you need to connect to our intelligence database (prod only). You can make your own though we won't stop you.

```
DOCUMENT_DATABASE_NAME=xxxx
DOCUMENT_DATABASE_USERNAME=xxxx
DOCUMENT_DATABASE_HOST=xxxx
DOCUMENT_DATABASE_PORT=5432
DOCUMENT_DATABASE_PASSWORD=xxxx
```

### Setup (MacOS)

Then run the server

```sh
npm install
npm run dev
```

### Scripts

If you need to run node script without running the server, use this example to get started

```sh
# creates the tables you need
npm run script create

# uopdates the tables
npm run script create

# scans for database, typically a daily cron job
npm run script scan

# analysis, typically a daily cron job.
npm run script analysis
```
