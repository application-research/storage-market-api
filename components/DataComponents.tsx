import styles from '@components/DataComponents.module.scss';

import * as React from 'react';

import dynamic from 'next/dynamic';

const ChartBarChartClients = dynamic(() => import('@components/ChartBarChartClients'), { ssr: false });
const ChartLineChartOnboardingRate = dynamic(() => import('@components/ChartLineChartOnboardingRate'), { ssr: false });

const ChartLineChartCulminativeOnboarding = dynamic(() => import('@components/ChartLineChartCulminativeOnboarding'), { ssr: false });

const ChartLineChartEntities = dynamic(() => import('@components/ChartLineChartEntities'), { ssr: false });

export default function DataComponents(props) {
  return (
    <div className={styles.body}>
      <section className={styles.text}>
        <p>Entities</p>
      </section>

      <ChartLineChartEntities data={props.data} />

      <section className={styles.text}>
        <p>Culminative data (TB)</p>
      </section>
      <ChartLineChartCulminativeOnboarding data={props.data} />

      <section className={styles.text}>
        <p>Onboarding rate (TB)</p>
      </section>
      <ChartLineChartOnboardingRate data={props.data} />

      <section className={styles.text}>
        <p>Clients</p>
      </section>
      <ChartBarChartClients data={props.clients} />

      <section className={styles.table}>
        {props.clients.map((each) => {
          const isComplete = each.total_data_onboarded_tb > 0 && each.total_data_onboarded_tb === each.total_potential_tb;
          const isPhaseComplete = each.total_data_onboarded_tb > 0 && each.total_data_to_onboard_tb === each.total_data_onboarded_tb;

          let rowStyle = null;

          if (isPhaseComplete) {
            rowStyle = { background: `#00FFFF` };
          }

          if (isComplete) {
            rowStyle = { background: `#39FF14` };
          }

          return (
            <div className={styles.row} style={rowStyle} key={each.id}>
              <div className={styles.col} style={{ width: '10%' }}>
                {each.id}
              </div>
              <div className={styles.col} style={{ width: '30%' }}>
                {each.name}
              </div>
              <div className={styles.col} style={{ color: '#0047ff' }}>
                {each.total_data_onboarded_tb} TB
              </div>
              <div className={styles.col} style={{}}>
                {each.total_data_to_onboard_tb} TB
              </div>
              <div className={styles.col} style={{ color: '#999' }}>
                {each.total_potential_tb} TB
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
