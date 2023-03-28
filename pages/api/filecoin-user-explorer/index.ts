// @ts-nocheck

import * as Server from '@common/server';
import DB from '@root/common/db';
import cache from 'memory-cache';

const CACHE_KEY = 'fil-user-explorer-data';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

async function APIFilecoinUserExplorer(req, res) {
  const cachedData = cache.get(CACHE_KEY);

  if (cachedData) {
    console.log('retrieving data from cache...');
    return res.json(cachedData);
  }

  await Server.cors(req, res);
  const currentDate = new Date();
  const intervalEndTimestamp = Math.floor(currentDate.getTime() / 1000);
  const secondsInTenWeeks = 10 * 7 * 24 * 60 * 60;
  const intervalStartTimestamp = intervalEndTimestamp - secondsInTenWeeks;
  let page = 1;
  const limit = 49;
  let allClients = [];

  while (true) {
    const response = await fetch(
      `https://api.datacapstats.io/api/getVerifiedClientsExtended?page=${page}&limit=${limit}&intervalStartTimestamp=${intervalStartTimestamp}&intervalEndTimestamp=${intervalEndTimestamp}`
    );

    const data = await response.json();
    const clients = data.data;

    if (clients.length === 0) {
      break;
    }

    allClients = allClients.concat(clients);
    page++;

    //wait 2 seconds before the next request
    await new Promise((resolve) => setTimeout(resolve, 8000));

    for (const client of allClients) {
      await DB('fil-user-explorer')
        .insert({
          address: client.address,
          address_id: client.addressId,
          allowance: client.allowance,
          allowance_array: JSON.stringify(client.allowanceArray),
          audit_trail: client.auditTrail,
          create_message_timestamp: client.createMessageTimestamp,
          create_at_height: client.createAtHeight,
          deal_count: client.dealCount,
          industry: client.industry,
          initial_allowance: client.initialAllowance,
          issue_create_timestamp: client.issueCreateTimestamp,
          name: client.name,
          org_name: client.orgName,
          provider_count: client.providerCount,
          received_datacap_change: client.receivedDatacapChange,
          region: client.region,
          retries: client.retries,
          top_provider: client.topProvider,
          used_datacap_change: client.usedDatacapChange,
          used_dc: JSON.stringify(client.usedDc),
          verifier_address_id: client.verifierAddressId,
          verifier_name: client.verifierName,
          website: JSON.stringify(client.website),
          data: client.data,
        })
        .onConflict('address_id')
        .merge();
    }
    cache.put(CACHE_KEY, allClients, CACHE_EXPIRATION_TIME);

    if (res && res.json) {
      return res.json({ ...allClients });
    }

    console.log(error, 'error occurred');
  }
}

setInterval(() => {
  APIFilecoinUserExplorer();
}, CACHE_EXPIRATION_TIME);
