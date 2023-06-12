import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import DB from '@common/db';

export default async function APIClientOnboardingHistoryByClientName(req, res) {
  await Server.cors(req, res);

  if (Utilities.isEmpty(req.query.name)) {
    return res.json({ error: true, message: 'No client name was provided' });
  }

  const response = await DB.select()
    .from('client_onboarding_table')
    .where('client_name', req.query.name)
    .orderBy('created_at', 'asc');

  const targetDate = new Date('2023-06-10');
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const onboardingDaysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  res.json({ timeseries: response, onboardingDaysAgo });
}
