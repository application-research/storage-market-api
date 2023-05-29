import styles from '@components/DataComponents.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import dynamic from 'next/dynamic';

const ChartBarChartClients = dynamic(() => import('@components/ChartBarChartClients'), { ssr: false });
const ChartLineChartOnboardingRate = dynamic(() => import('@components/ChartLineChartOnboardingRate'), { ssr: false });

const ChartLineChartCulminativeOnboarding = dynamic(() => import('@components/ChartLineChartCulminativeOnboarding'), { ssr: false });

const ChartLineChartEntities = dynamic(() => import('@components/ChartLineChartEntities'), { ssr: false });

const ChartBarChartMacro = dynamic(() => import('@components/ChartBarChartMacro'), { ssr: false });

export default function DataComponents(props) {
  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <section className={styles.text}>
          <p>Overview</p>
        </section>
        <ChartBarChartMacro data={props.phases} />
      </div>

      <section className={styles.text}>
        <p>Entities</p>
        <p className={styles.mono}>Entities that are running in the wild, this is where our data comes from.</p>
      </section>

      <ChartLineChartEntities data={props.data} />

      <section className={styles.text}>
        <p>Culminative data (TB)</p>
        <p className={styles.mono}>All the data onboarded by every Delta node on the internet. Our goal is 10 petabytes by the end of Q3.</p>
      </section>
      <ChartLineChartCulminativeOnboarding data={props.data} />

      <section className={styles.text}>
        <p>Onboarding rate (TB)</p>
        <p className={styles.mono}>We're aiming to get to 300 TB of onboarding a day.</p>
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

          let rowStyle = { background: '#ADADAD' };

          if (isPhaseComplete) {
            rowStyle = { background: `#00FFFF` };
          }

          if (isComplete) {
            rowStyle = { background: `#39FF14` };
          }

          return (
            <div key={each.id}>
              <div className={styles.row} style={rowStyle}>
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
                  {each.total_potential_tb} TB Total
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col} style={{ width: '10%' }}>
                  &nbsp;
                </div>
                <div className={styles.col} style={{ width: '30%' }}>
                  &nbsp;
                </div>
                <div className={styles.col}>start: {each.initation_at}</div>
                <div className={styles.col} style={{}}>
                  ping:&nbsp;{each.last_initation_at}
                </div>
                <div className={styles.col}>response:&nbsp;{each.last_response_at}</div>
              </div>
              {!Utilities.isEmpty(each.text_bottleneck) ? (
                <div className={styles.row}>
                  <div className={styles.col} style={{ width: '40%', textAlign: 'right' }}>
                    bottleneck: {each.text_bottleneck_source}
                  </div>
                  <div className={styles.col} style={{ width: '60%' }}>
                    reason: {each.text_bottleneck}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </section>
    </div>
  );
}
