import * as Server from '@common/server';

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

  res.json({ onboardingHistory: response, onboardingDaysAgo });
}
