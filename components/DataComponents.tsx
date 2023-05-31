import styles from '@components/DataComponents.module.scss';
import dynamic from 'next/dynamic';

import * as React from 'react';
import * as Utilities from '@common/utilities';

const ChartBarChartClients = dynamic(() => import('@components/ChartBarChartClients'), { ssr: false });
const ChartLineChartOnboardingRate = dynamic(() => import('@components/ChartLineChartOnboardingRate'), { ssr: false });
const ChartLineChartCulminativeOnboarding = dynamic(() => import('@components/ChartLineChartCulminativeOnboarding'), { ssr: false });
const ChartLineChartEntities = dynamic(() => import('@components/ChartLineChartEntities'), { ssr: false });
const ChartBarChartMacro = dynamic(() => import('@components/ChartBarChartMacro'), { ssr: false });

export default function DataComponents(props) {
  let first_day = props.history[0].created_at;
  let firstDayAgo = Utilities.getDaysAgoFromToday(first_day);

  const history = props.history.map((each) => {
    const targetDate = new Date(each.created_at);
    const daysAgo = Utilities.getDaysAgoFromToday(each.created_at);
    const onboarded_data_terabytes = Utilities.bytesToTerabytes(each.total_deals_succeeded_size);
    const total_delta_nodes = Number(each.total_number_of_unique_delta_nodes);
    const days = firstDayAgo - daysAgo + 1;
    const daily_onboarding_rate_terabytes = onboarded_data_terabytes / days;
    return {
      ...each,
      name: `${targetDate.getMonth() + 1}/${targetDate.getDate()}`,
      total_delta_nodes,
      days_ago: daysAgo,
      total_storage_providers: each.total_number_of_sps_worked_with,
      onboarded_data_terabytes,
      target_onboarding_rate_terabytes: 300,
      target_onboarded_data_terabytes: 100,
      human_onboarded_data_terabytes: Utilities.bytesToSize(each.total_deals_succeeded_size),
      hypothetical_onboarding_data_terabytes: (daily_onboarding_rate_terabytes / total_delta_nodes) * 1000,
      daily_onboarding_rate_terabytes,
    };
  });

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

      <ChartLineChartEntities data={history} />

      <section className={styles.text}>
        <p>Culminative data (TB)</p>
        <p className={styles.mono}>All the data onboarded by every Delta node on the internet. Our goal is 10 petabytes by the end of Q3.</p>
      </section>
      <ChartLineChartCulminativeOnboarding data={history} />

      <section className={styles.text}>
        <p>Onboarding rate (TB)</p>
        <p className={styles.mono}>
          We're aiming to get to 300 TB of onboarding a day. Hypothetical onboarding rate is taking the average performance of a single Delta node and assuming there are a thousand
          nodes running.
        </p>
      </section>
      <ChartLineChartOnboardingRate data={history} />

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
