'use client';

import styles from '@components/ChartLineChartCulminativeOnboarding.module.scss';

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
          <Line type="monotone" dataKey="target_onboarded_data_terabytes" stroke="#ff5349" />
          <Line type="monotone" dataKey="onboarded_data_terabytes" stroke="#0047ff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
