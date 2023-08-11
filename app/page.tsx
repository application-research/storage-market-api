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

export default async function Page(props) {
  const currentHeaders = headers();

  /*
  const host = currentHeaders.get('host');
  const { storageProviders, count } = await makeRequest({ host, endpoint: 'providers' });
  const { mapUrl } = await makeRequest({ host, endpoint: 'map' });
  const { clients, phases } = await makeRequest({ host, endpoint: 'clients' });
  const { onboardingHistory, onboardingDaysAgo, clientsToTrack } = await makeRequest({ host, endpoint: 'clients/history' });
  */

  return (
    <DefaultLayout>
      <div className={styles.row}>
        <h6 className={styles.heading}>get all Filecoin addresses using Delta.</h6>
        <div>
          <a className={styles.link} href="https://data.storage.market/api/delta/addresses" target="_blank">
            ➝ https://data.storage.market/api/delta/addresses
          </a>
        </div>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>get global performance of our Filecoin storage deal tools.</h6>
        <div>
          <a className={styles.link} href="https://data.storage.market/api/delta" target="_blank">
            ➝ https://data.storage.market/api/delta
          </a>
        </div>
        <div>
          <a className={styles.link} href="https://data.storage.market/api/clients/history" target="_blank">
            ➝ https://data.storage.market/api/clients/history
          </a>
        </div>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>get the current Filecoin price or convert attoFil to USD and Filecoin.</h6>
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
    </DefaultLayout>
  );
}
