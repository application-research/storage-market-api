// NOTE(jim)
// To use file system routing, you must have `page.tsx`.
import { headers } from 'next/headers';

import '@root/global.scss';
import styles from '@root/general-styles.module.scss';
import DefaultLayout from '@components/DefaultLayout';
import DataComponents from '@components/DataComponents';

async function makeRequest({ host, endpoint }) {
  try {
    const res = await fetch(`http://${host}/api/${endpoint}`);
    const json = await res.json();
    return { ...json };
  } catch (e) {
    return { storageProviders: [], count: 0 };
  }
}

// NOTE(jim): Rip out the hardcoding after the meeting on wednesday.
const data = [
  {
    name: '5/13',
    total_delta_nodes: 142,
    total_storage_providers: 112,
    target_onboarding_rate_terabytes: 300,
    onboarded_data_terabytes: 52.78,
    target_onboarded_data_terabytes: 10000,
    hypothetical_onboarding_data_terabytes: (52.78 / 142 / 13) * 1000,
    daily_onboarding_rate_terabytes: 52.78 / 13,
  },
  {
    name: '5/15',
    total_delta_nodes: 148,
    total_storage_providers: 114,
    target_onboarding_rate_terabytes: 300,
    onboarded_data_terabytes: 52.8,
    target_onboarded_data_terabytes: 10000,
    hypothetical_onboarding_data_terabytes: (52.8 / 148 / 15) * 1000,
    daily_onboarding_rate_terabytes: 52.78 / 15,
  },
  {
    name: '5/18',
    total_delta_nodes: 162,
    total_storage_providers: 114,
    target_onboarding_rate_terabytes: 300,
    onboarded_data_terabytes: 53.12,
    target_onboarded_data_terabytes: 10000,
    hypothetical_onboarding_data_terabytes: (53.12 / 162 / 18) * 1000,
    daily_onboarding_rate_terabytes: 52.78 / 18,
  },
  {
    name: '5/21',
    total_delta_nodes: 162,
    total_storage_providers: 116,
    target_onboarding_rate_terabytes: 300,
    onboarded_data_terabytes: 53.24,
    target_onboarded_data_terabytes: 10000,
    hypothetical_onboarding_data_terabytes: (53.24 / 162 / 21) * 1000,
    daily_onboarding_rate_terabytes: 52.78 / 21,
  },
  {
    name: '5/23',
    total_delta_nodes: 162,
    total_storage_providers: 116,
    target_onboarding_rate_terabytes: 300,
    onboarded_data_terabytes: 53.26,
    target_onboarded_data_terabytes: 10000,
    hypothetical_onboarding_data_terabytes: (53.26 / 162 / 23) * 1000,
    daily_onboarding_rate_terabytes: 52.78 / 23,
  },
];

export default async function Page(props) {
  const currentHeaders = headers();
  const { storageProviders, count } = await makeRequest({ host: currentHeaders.get('host'), endpoint: 'providers' });
  const { mapUrl } = await makeRequest({ host: currentHeaders.get('host'), endpoint: 'map' });
  const { clients } = await makeRequest({ host: currentHeaders.get('host'), endpoint: 'clients' });

  const listElements = storageProviders.map((each) => {
    return (
      <div key={`sp-${each.address}`}>
        <a className={styles.link} href={`https://data.storage.market/api/providers/${each.address}`} target="_blank">
          ➝ https://data.storage.market/api/providers/{each.address}
        </a>
      </div>
    );
  });

  const leftElement = <DataComponents data={data} clients={clients} />;

  return (
    <DefaultLayout left={leftElement}>
      <div className={styles.row}>
        <h6 className={styles.heading}>get global performance of our Filecoin storage deal tools.</h6>
        <div>
          <a className={styles.link} href="https://data.storage.market/api/delta" target="_blank">
            ➝ https://data.storage.market/api/delta
          </a>
        </div>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>get the current Filecoin price (powered by IEXCloud) or convert attoFil to USD and Filecoin.</h6>
        <div>
          <a className={styles.link} href="https://data.storage.market/api/market/filecoin?attofil=6643845374681246791213" target="_blank">
            ➝ https://data.storage.market/api/market/filecoin?attofil=6643845374681246791213
          </a>
        </div>
        <div>
          <a className={styles.link} href="https://data.storage.market/api/market/filecoin?amount=1000000" target="_blank">
            ➝ https://data.storage.market/api/market/filecoin?amount=1000000
          </a>
        </div>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>
          [WIP] [Not Working] get ranked storage providers to make deals with based on reputation, that have stored data on Estuary and/or similar data clients (8).
        </h6>
        <a className={styles.link} href="https://data.storage.market/api" target="_blank">
          ➝ https://data.storage.market/api
        </a>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>get all providers that has stored data on Estuary and/or similar data clients.</h6>
        <a className={styles.link} href="https://data.storage.market/api/providers/" target="_blank">
          ➝ https://data.storage.market/api/providers/
        </a>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>every storage provider we could make deals with (4000+) but haven't tried.</h6>
        <a className={styles.link} href="https://data.storage.market/api/providers/all" target="_blank">
          ➝ https://data.storage.market/api/providers/all
        </a>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>
          every storage provider Filecoin Data Tools (https://filecoindata.tools) makes deals with ({count}){' '}
          <a className={styles.link} href={mapUrl} target="_blank">
            &#128506; View Map
          </a>
        </h6>

        {listElements}
      </div>
    </DefaultLayout>
  );
}
