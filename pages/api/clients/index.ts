import * as Server from '@common/server';
import * as GoogleSheets from '@common/google';

import DB from '@common/db';

export default async function APIGetSpreadSheet(req, res) {
  await Server.cors(req, res);

  const rows = await GoogleSheets.getRowData();

  const clients = [];
  let id = 0;
  for (let row of rows) {
    if (row['api_ready'] === 'TRUE') {
      id += 1;

      clients.push({
        id,
        name: row['Client Name'],
        total_data_to_onboard_tb: Number(row['Data to Onboard (TB)']),
        total_data_onboarded_tb: Number(row['Amount Onboarded (TB)']),
        total_potential_tb: Number(row['Total Potential Data (TB)']),
        total_replications: row['Target # Replications'],
      });
    }
  }

  res.json({ success: true, clients });
}
