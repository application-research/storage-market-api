import dns from 'dns';
import * as Server from '@common/server';
import { isIP } from 'is-ip';
import IPInfoWrapper, { LruCache } from 'node-ipinfo';
import DB from '@common/db';

const cacheKey = "map"
const cacheOptions = {
  max: 1,
  maxAge: 24 * 1000 * 60 * 60, // 24h
};
const cache = new LruCache(cacheOptions);

// Token is not required for our lookups
const ipinfo = new IPInfoWrapper('');

export default async function EstuaryMap(req, res) {
  await Server.cors(req, res);

  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ mapUrl: cached });
  } else {
    const sps = await DB.select().from('filecoin_storage_providers').whereNotNull('multiaddrs');

    const ipList = await getSpAddresses(sps);

    const ipMap = await ipinfo.getMap(ipList);

    cache.set(cacheKey, ipMap.reportUrl);
    res.json({ mapUrl: ipMap.reportUrl });
  }
}

/**
 * Extracts a list of IP addresses from a list of Storage Providers
 * Note: If multiple `multiaddrs` are present, only the first valid one will be returned.
 * @param sps List of storage providers
 * @returns
 */
async function getSpAddresses(sps: any[]) {
  const ipList: string[] = [];

  for (const sp of sps) {
    const multiaddrs = sp.multiaddrs.addresses;

    for (const addr of multiaddrs) {
      // example multiaddr: "/ip4/206.123.144.236/tcp/24002"
      const maybeIp = addr.split('/')[2];

      if (isIP(maybeIp)) {
        ipList.push(maybeIp);
        break;
      } else {
        try {
          // It may be a hostname, try to resolve to an IP address
          const resolved = await dns.promises.resolve(maybeIp);
          ipList.push(resolved[0]);
          break;
        } catch {
          // IP could not be resolved from hostname
          // Try next multiaddr
          continue;
        }
      }
    }
  }

  return ipList;
}
