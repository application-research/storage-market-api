'use client';

import styles from '@components/ChartLineChartEntities.module.scss';

import * as React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartLineChartEntities(props) {
  return (
    <div className={styles.body}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={200} data={props.data} margin={{ left: 16, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_delta_nodes" stroke="#0047FF" />
          <Line type="monotone" dataKey="total_storage_providers" stroke="#BF40BF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
