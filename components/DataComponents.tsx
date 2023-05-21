import styles from '@components/DataComponents.module.scss';

import * as React from 'react';

import dynamic from 'next/dynamic';

const ChartBarChartClients = dynamic(() => import('@components/ChartBarChartClients'), { ssr: false });

export default function DataComponents(props) {
  return (
    <div className={styles.body}>
      <section className={styles.text}>
        <p>Currently onboarding {props.clients.length} clients to the Filecoin Network for archival and Edge-UR for high availability.</p>
        <div className={styles.section}>
          <div className={styles.left} style={{ background: `#0047FF` }} />
          <div className={styles.right}>Data onboarded to the Filecoin Network successfully, not including replications (TB)</div>
        </div>
        <div className={styles.section}>
          <div className={styles.left} style={{ background: `#000` }} />
          <div className={styles.right}>Data remaining to be onboarded (TB)</div>
        </div>
      </section>
      <ChartBarChartClients data={props.clients} />
      <br />
      {props.clients.map((each) => {
        return (
          <div className={styles.row}>
            <div className={styles.col} style={{ width: '10%' }}>
              {each.id}
            </div>
            <div className={styles.col} style={{ width: '40%' }}>
              {each.name}
            </div>
            <div className={styles.col} style={{ color: '#0047ff' }}>
              {each.total_data_onboarded_tb} terabytes
            </div>
            <div className={styles.col}>{each.total_potential_tb} terabytes</div>
          </div>
        );
      })}
    </div>
  );
}
