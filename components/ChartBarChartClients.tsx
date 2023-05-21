'use client';

import styles from '@components/ChartBarChartClients.module.scss';

import * as React from 'react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartBarChartClients(props) {
  const data = props.data.map((each) => {
    return {
      ...each,
      amount_onboarded_tb: each.total_data_onboarded_tb,
      amount_remaining_tb: each.total_data_to_onboard_tb - each.total_data_onboarded_tb,
    };
  });

  return (
    <div className={styles.body}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount_onboarded_tb" stackId="a" fill="#0047FF" />
          <Bar dataKey="amount_remaining_tb" stackId="a" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
