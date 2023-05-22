'use client';

import styles from '@components/ChartLineChartOnboardingRate.module.scss';

import * as React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// NOTE(jim): Rip out the hardcoding after the meeting on monday.
const data = [
  {
    name: '5/13',
    total_delta_nodes: 142,
    onboarded_data_terabytes: 52.78,
    theroetical_maximum_terabytes: (52.78 / 142) * 1000,
    daily_onboarding_rate_terabytes: 4.06,
  },
  {
    name: '5/15',
    total_delta_nodes: 148,
    onboarded_data_terabytes: 52.8,
    theroetical_maximum_terabytes: (52.8 / 142) * 1000,
    daily_onboarding_rate_terabytes: 3.77,
  },
  {
    name: '5/18',
    total_delta_nodes: 162,
    onboarded_data_terabytes: 53.12,
    theroetical_maximum_terabytes: (53.12 / 142) * 1000,
    daily_onboarding_rate_terabytes: 3.12,
  },
  {
    name: '5/21',
    total_delta_nodes: 162,
    onboarded_data_terabytes: 53.24,
    theroetical_maximum_terabytes: (53.24 / 142) * 1000,
    daily_onboarding_rate_terabytes: 2.66,
  },
];

export default function ChartLineChartOnboardingRate(props) {
  return (
    <div className={styles.body}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_delta_nodes" stroke="#D9027D" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="onboarded_data_terabytes" stroke="#0047ff" />
          <Line type="monotone" dataKey="theroetical_maximum_terabytes" stroke="#00FFFF" />
          <Line type="monotone" dataKey="daily_onboarding_rate_terabytes" stroke="black" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
