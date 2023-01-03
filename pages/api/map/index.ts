import dns from 'dns';
import * as Server from '@common/server';
import { isIP, isIPv4 } from 'is-ip';
import DB from '@common/db';

export default async function EstuaryMap(req, res) {
  await Server.cors(req, res);

  const sps = await DB.select().from('filecoin_storage_providers').whereNotNull('multiaddrs');

  const ipList = await getSpAddresses(sps);

  res.json({ ips: ipList });
}

/**
 * Extracts a list of IP addresses from a list of Storage Providers
 * Note: If multiple `multiaddrs` are present, only the first valid one will be returned.
 * @param sps 
 * @returns 
 */
async function getSpAddresses(sps: any[]) {
  const ipList: string[] = [];

  for (const sp of sps) {
    const multiaddrs = sp.multiaddrs.addresses;

    for (const addr of multiaddrs) {
      const maybeIp = addr.split('/')[2];

      if (isIP(maybeIp)) {
        ipList.push(maybeIp);
        break;
      } else {
        try {
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