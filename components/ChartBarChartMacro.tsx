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
          <Bar dataKey="phase_8" stackId="a" fill="#FF0100" />
          <Bar dataKey="phase_7" stackId="a" fill="#F4CCCC" />
          <Bar dataKey="phase_6" stackId="a" fill="#F9CB9C" />
          <Bar dataKey="phase_5" stackId="a" fill="#FFE598" />
          <Bar dataKey="phase_4" stackId="a" fill="#C9DAF8" />
          <Bar dataKey="phase_3" stackId="a" fill="#00FFFF" />
          <Bar dataKey="phase_2" stackId="a" fill="#FF00FF" />
          <Bar dataKey="phase_1" stackId="a" fill="#00FF00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
