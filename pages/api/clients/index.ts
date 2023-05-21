import * as Server from '@common/server';
import * as GoogleSheets from '@common/google';

import DB from '@common/db';

export default async function APIGetSpreadSheet(req, res) {
  await Server.cors(req, res);

  const rows = await GoogleSheets.getRowData();

  const clients = [];
  for (let row of rows) {
    if (row['api_ready'] === 'TRUE') {
      if (!['🟢', '⚫', '💗', '🔵'].includes(row['Status'])) {
        continue;
      }

      clients.push({
        name: row['Client Name'],
        total_data_to_onboard_tb: row['Data to Onboard (TB)'],
        total_data_onboarded_tb: row['Amount Onboarded (TB)'],
        total_replications: row['Target # Replications'],
      });
    }
  }

  res.json({ success: true, clients });
}
