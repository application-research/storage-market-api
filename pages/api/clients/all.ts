import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import DB from '@common/db';

export default async function APIClientOnboardingHistoryAll(req, res) {
  await Server.cors(req, res);

  const targetDate = new Date('2023-05-01');
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const onboardingDaysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const nameSpaces = await fetch('https://cpistats.estuary.tech/report.json', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const names = await nameSpaces.json();

  for (let i = 0; i < names.length; i++) {
    names[i].timeseries = await DB.select()
      .from('client_onboarding_table')
      .where('client_name', names[i].name.replace('customer-', ''))
      .orderBy('created_at', 'asc');
  }

  res.json({ clients: names, onboardingDaysAgo });
}
