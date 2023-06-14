import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import DB from '@common/db';

export default async function APIClientOnboardingHistory(req, res) {
  await Server.cors(req, res);

  const response = await DB.select()
    .from('delta_analytics')
    .orderBy('created_at', 'asc');

  const targetDate = new Date('2023-05-01');
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const onboardingDaysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const clientsToTrack = ['hivemapper', 'encloud'];
  const timeseriesMap = {};

  for (const clientName of clientsToTrack) {
    if (!timeseriesMap[clientName]) {
      timeseriesMap[clientName] = {};
    }

    const timeseries = await DB.select()
      .from('client_onboarding_table')
      .where('client_name', clientName)
      .orderBy('created_at', 'asc');

    for (const moment of timeseries) {
      const currentDate = moment.created_at.toISOString().split('T')[0];
      timeseriesMap[clientName][currentDate] = moment;
    }
  }

  const onboardingHistory = response.map((each) => {
    const currentDate = each.created_at.toISOString().split('T')[0];

    for (const clientName of clientsToTrack) {
      if (timeseriesMap[clientName][currentDate]) {
        const item = timeseriesMap[clientName][currentDate];
        const bytes = Number(item.delta_total_sealed_deal_in_bytes) + Number(item.edge_total_size);
        const terabytes = Utilities.bytesToTerabytes(bytes);
        each[`${clientName}_onboarded`] = terabytes;
      }
    }

    return each;
  });

  res.json({ onboardingHistory: response, onboardingDaysAgo, clientsToTrack });
}
