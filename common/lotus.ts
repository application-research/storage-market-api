import { NodejsProvider } from '@filecoin-shipyard/lotus-client-provider-nodejs';
import { LotusRPC } from '@filecoin-shipyard/lotus-client-rpc';
import { mainnet } from '@filecoin-shipyard/lotus-client-schema';

const provider = new NodejsProvider('wss://api.chain.love/rpc/v0');

export const getClient = () => {
  const client = new LotusRPC(provider, { schema: mainnet.fullNode });
  return client;
};

export const getStorageClient = () => {
  const client = new LotusRPC(provider, { schema: mainnet.storageMiner });
  return client;
};
