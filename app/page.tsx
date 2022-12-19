// NOTE(jim)
// To use file system routing, you must have `page.tsx`.
import { headers } from 'next/headers';

import '@root/global.scss';
import styles from '@root/general-styles.module.scss';
import DefaultLayout from '@components/DefaultLayout';

async function makeExampleRequest({ host }) {
  try {
    const res = await fetch(`http://${host}/api/providers`);
    const json = await res.json();
    return { ...json };
  } catch (e) {
    return { storageProviders: [], count: 0 };
  }
}

export default async function Page(props) {
  const currentHeaders = headers();
  const { storageProviders, count } = await makeExampleRequest({ host: currentHeaders.get('host') });

  const listElements = storageProviders.map((each) => {
    return (
      <div key={`sp-${each.address}`}>
        <a className={styles.link} href={`https://data.storage.market/api/providers/${each.address}`} target="_blank">
          ➝ https://data.storage.market/api/providers/{each.address}
        </a>
      </div>
    );
  });

  return (
    <DefaultLayout>
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
        <h6 className={styles.heading}>get every storage provider we think we could make deals with (4000+).</h6>
        <a className={styles.link} href="https://data.storage.market/api/providers/all" target="_blank">
          ➝ https://data.storage.market/api/providers/all
        </a>
      </div>

      <div className={styles.row}>
        <h6 className={styles.heading}>get details on each storage provider that has stored data on Estuary ({count}).</h6>
        {listElements}
      </div>
    </DefaultLayout>
  );
}
