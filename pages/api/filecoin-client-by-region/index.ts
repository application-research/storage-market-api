import * as Server from '@common/server';
import DB from '@root/common/db';
import cache from 'memory-cache';

const CACHE_KEY = 'fil-user-explorer-data';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export default async function APIFilecoinUserExplorerByRegion(req, res) {
  const cachedData = cache.get(CACHE_KEY);

  if (cachedData) {
    console.log('retrieving data from cache...');
    return res.json(cachedData);
  }

  await Server.cors(req, res);
  const currentDate = new Date();
  const intervalEndTimestamp = Math.round(currentDate.getTime() / 1000);
  const secondsInSixMonths = 6 * 30 * 24 * 60 * 60; // approx seconds in 6 months
  const intervalStartTimestamp = intervalEndTimestamp - secondsInSixMonths;

  let allClients = [];
  if (cachedData) {
    console.log('retrieving data from cache...');
    return res.json(cachedData);
  }
  try {
    const response = await fetch(
      `https://api.datacapstats.io/api/getDatacapUsageByRegion?intervalStartTimestamp=${intervalStartTimestamp}&intervalEndTimestamp=${intervalEndTimestamp}`
    );

    const clients = await response.json();
    console.log(clients);
    if (clients.length === 0) {
      return res.json('No data found');
    }

    allClients = allClients.concat(clients);
    for (const client of allClients) {
      await DB('fil-user-explorer-region')
        .insert({
          outgoing_datacap: client.outgoingDatacap,
          region: client.region,
          year: client.year,
          week: client.week,
          data: client.data,
        })
        .onConflict('client_id')
        .merge();
    }
    cache.put(CACHE_KEY, allClients, CACHE_EXPIRATION_TIME);

    setTimeout(() => {
      cache.del(CACHE_KEY);
    }, CACHE_EXPIRATION_TIME);
    return res.json(allClients);
  } catch (error) {
    console.error('Error getting data', error.message);
    return res.status(500).json({ error: error.message });
  }
}
