'use client';

import styles from '@components/ChartBarChartMacro.module.scss';

import * as React from 'react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartBarChartMarco(props) {
  const data = props.data.map((each) => {
    return {
      ...each,
    };
  });

  return (
    <div className={styles.body}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#000' }} />
          <Legend />
          <Bar dataKey="blocked_education" stackId="a" fill="#F9CB9C" />
          <Bar dataKey="blocked_setup" stackId="a" fill="#FCE4CD" />
          <Bar dataKey="blocked_data_prep" stackId="a" fill="#F1C231" />
          <Bar dataKey="blocked_application" stackId="a" fill="#FFD866" />
          <Bar dataKey="blocked_notary" stackId="a" fill="#FFE598" />
          <Bar dataKey="onboarding_poc" stackId="a" fill="#D0DFE2" />
          <Bar dataKey="done_poc" stackId="a" fill="#00FFFF" />
          <Bar dataKey="post_poc_deferment" stackId="a" fill="#9902FF" />
          <Bar dataKey="onboarding_remaining" stackId="a" fill="#B6D7A8" />
          <Bar dataKey="done" stackId="a" fill="#00FF00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
