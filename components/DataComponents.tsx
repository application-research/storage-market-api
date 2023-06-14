import styles from '@components/DataComponents.module.scss';
import dynamic from 'next/dynamic';

import * as React from 'react';
import * as Utilities from '@common/utilities';

const ChartBarChartClients = dynamic(() => import('@components/ChartBarChartClients'), { ssr: false });
const ChartLineChartOnboardingRate = dynamic(() => import('@components/ChartLineChartOnboardingRate'), { ssr: false });
const ChartLineChartMovingAverage = dynamic(() => import('@components/ChartLineChartMovingAverage'), { ssr: false });
const ChartLineChartCulminativeOnboarding = dynamic(() => import('@components/ChartLineChartCulminativeOnboarding'), { ssr: false });
const ChartLineChartEntities = dynamic(() => import('@components/ChartLineChartEntities'), { ssr: false });
const ChartBarChartMacro = dynamic(() => import('@components/ChartBarChartMacro'), { ssr: false });

export default function DataComponents(props) {
  let firstDay = null;
  let firstDayAgo = null;
  if (props.history && props.history.length) {
    firstDay = props.history[0].created_at;
    firstDayAgo = Utilities.getDaysAgoFromToday(firstDay);
  }

  const history = props.history.map((each) => {
    const targetDate = new Date(each.created_at);
    const daysAgo = Utilities.getDaysAgoFromToday(each.created_at);
    const days = firstDayAgo - daysAgo + 1;

    const onboarded_data_terabytes = Utilities.bytesToTerabytes(each.total_deals_succeeded_size);
    const total_delta_nodes = Number(each.total_number_of_unique_delta_nodes);
    const daily_onboarding_rate_terabytes = onboarded_data_terabytes / days;

    return {
      ...each,
      name: `${targetDate.getMonth() + 1}/${targetDate.getDate()}`,
      total_delta_nodes,
      days_ago: daysAgo,
      total_storage_providers: each.total_number_of_sps_worked_with,
      onboarded_data_terabytes,
      target_onboarding_rate_terabytes: 100,
      target_onboarded_data_terabytes: 500,
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
      </section>

      <ChartLineChartEntities data={history} />

      <section className={styles.text}>
        <p>Culminative data (TB)</p>
      </section>
      <ChartLineChartCulminativeOnboarding data={history} />

      <section className={styles.text}>
        <p>Daily onboarded amount (TB)</p>
      </section>
      <ChartLineChartOnboardingRate data={history} clientsToTrack={props.clientsToTrack} />

      <section className={styles.text}>
        <p>Moving average onboarding rate (TB)</p>
      </section>
      <ChartLineChartMovingAverage data={history} />
    </div>
  );
}
