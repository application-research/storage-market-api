'use client';

import styles from '@components/ChartLineChartOnboardingRate.module.scss';

import * as React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartLineChartOnboardingRate(props) {
  const onboardedDaily = [];

  for (let i = 0; i < props.data.length; i++) {
    const x = props.data[i];
    const previous = props.data[i - 1] ? props.data[i - 1] : { onboarded_data_terabytes: 0 };
    const amount_onboarded = x.onboarded_data_terabytes - previous.onboarded_data_terabytes;

    const next = {
      name: props.data[i].name,
      amount_onboarded,
      target_onboarding_rate_terabytes: x.target_onboarding_rate_terabytes,
      onboarded_data_terabytes: props.data[i].onboarded_data_terabytes,
    };

    for (const clientName of props.clientsToTrack) {
      const key = `${clientName}_onboarded`;
      if (x[key] && (previous[key] || previous[key] === 0)) {
        next[`${clientName}_onboarded_daily`] = x[key] - previous[key];
      }
    }

    onboardedDaily.push(next);
  }

  return (
    <div className={styles.body}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={200} data={onboardedDaily} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="target_onboarding_rate_terabytes" stroke="#ff5349" />
          <Line type="monotone" dataKey="amount_onboarded" stroke="#0047FF" />
          <Line type="monotone" dataKey="hivemapper_onboarded_daily" stroke="#dc3545" />
          <Line type="monotone" dataKey="encloud_onboarded_daily" stroke="#d63384" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
