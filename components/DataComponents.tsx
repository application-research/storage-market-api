import styles from '@components/DataComponents.module.scss';

import * as React from 'react';

import dynamic from 'next/dynamic';

const ChartBarChartClients = dynamic(() => import('@components/ChartBarChartClients'), { ssr: false });
const ChartLineChartOnboardingRate = dynamic(() => import('@components/ChartLineChartOnboardingRate'), { ssr: false });

export default function DataComponents(props) {
  return (
    <div className={styles.body}>
      <section className={styles.text}>
        <p>Onboarding Rate</p>

        <div className={styles.section}>
          <div className={styles.left} style={{ background: `#00FFFF` }} />
          <div className={styles.right}>If we get to 1000 Delta Nodes, theroetically we could have onboarded 374.929 terabytes if we had that many nodes in the wild.</div>
        </div>
        <div className={styles.section}>
          <div className={styles.left} style={{ background: `#0047ff` }} />
          <div className={styles.right}>Onboarded data to the Filecoin Network and sealed.</div>
        </div>
        <div className={styles.section}>
          <div className={styles.left} style={{ background: `#D9027D` }} />
          <div className={styles.right}>Total Delta nodes making Filecoin storage deals against 114 storage providers.</div>
        </div>
        <div className={styles.section}>
          <div className={styles.left} style={{ background: `black` }} />
          <div className={styles.right}>The daily onboarding rate in terabytes</div>
        </div>
      </section>

      <ChartLineChartOnboardingRate />
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
