'use client';

import styles from '@components/ChartLineChartOnboardingRate.module.scss';

import * as React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartLineChartOnboardingRate(props) {
  return (
    <div className={styles.body}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={200} data={props.data} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="daily_onboarding_rate_terabytes" stroke="#0047FF" />
          <Line type="monotone" dataKey="hypothetical_onboarding_data_terabytes" stroke="#BF40BF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
