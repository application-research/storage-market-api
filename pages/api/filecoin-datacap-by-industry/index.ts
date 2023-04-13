// @ts-nocheck

import * as Server from '@common/server';
import DB from '@root/common/db';
import cache from 'memory-cache';

const CACHE_KEY = 'fil-user-explorer-data';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export default async function APIFilecoinUserExplorerByIndustry(req, res) {
  const cachedData = cache.get(CACHE_KEY);

  if (cachedData) {
    console.log('retrieving data from cache...');
    return res.json(cachedData);
  }

  await Server.cors(req, res);
  const currentDate = new Date();
  const intervalEndTimestamp = Math.round(currentDate.getTime() / 1000);
  const secondsInAYear = 31536000;
  const intervalStartTimestamp = intervalEndTimestamp - secondsInAYear;

  let page = 1;
  const limit = 49;
  let allClients = [];

  while (page < 100) {
    const res = await fetch(
      `https://api.datacapstats.io/api/getVerifiedClientsExtended?page=${page}&limit=${limit}&intervalStartTimestamp=${intervalStartTimestamp}&intervalEndTimestamp=${intervalEndTimestamp}`
    );

    const clients = await res.json();
    console.log(clients);
    if (clients.data.length === 0) {
      break;
    }

    allClients = allClients.concat(clients.data);
    page++;

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  //wait 8 seconds before the next request
  await new Promise((resolve) => setTimeout(resolve, 8000));

  for (const client of allClients) {
    await DB('fil-user-explorer-region')
      .insert({
        id: client.id,
        outgoing_datacap: client.outgoingDatacap,
        incoming_datacap: client.incomingDatacap,
        industry: client.industry,
        year: client.year,
        week: client.week,
        data: client.data,
      })
      .onConflict('id')
      .merge();
  }
  cache.put(CACHE_KEY, allClients, CACHE_EXPIRATION_TIME);

  setTimeout(() => {
    APIFilecoinUserExplorer(req, res);
  }, CACHE_EXPIRATION_TIME);

  return res.json('success, data was saved to database');
  // return res.json({ ...allClients });
}

APIFilecoinUserExplorer();
