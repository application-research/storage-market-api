import * as Server from '@common/server';
import * as GoogleSheets from '@common/google';

import DB from '@common/db';

export default async function APIGetSpreadSheet(req, res) {
  await Server.cors(req, res);

  const { clientRows, phaseRows } = await GoogleSheets.getSheetMultiple();

  const clients = [];
  let id = 0;
  for (let row of clientRows) {
    if (row['api_ready'] === 'TRUE') {
      id += 1;

      clients.push({
        id,
        name: row['Client Name'],
        total_data_to_onboard_tb: Number(row['Data to Onboard (TB)']),
        total_data_onboarded_tb: Number(row['Amount Onboarded (TB)']),
        total_potential_tb: Number(row['Total Potential Data (TB)']),
        total_replications: row['Target # Replications'],
        last_response_at: row['Last Response'],
        last_initation_at: row['Last Initiation'],
        initation_at: row['Initation'],
        text_bottleneck: row['Biggest bottleneck'],
        text_bottleneck_source: row['Bottleneck Source'],
      });
    }
  }

  const phases = [];
  for (let row2 of phaseRows) {
    if (row2['DATE'] !== 'DATE') {
      if (!row2['1']) {
        continue;
      }

      phases.push({
        date: row2['DATE'],
        phase_1: Number(row2['1']),
        phase_2: Number(row2['2']),
        phase_3: Number(row2['3']),
        phase_4: Number(row2['4']),
        phase_5: Number(row2['5']),
        phase_6: Number(row2['6']),
        phase_7: Number(row2['7']),
        phase_8: Number(row2['8']),
      });
    }
  }

  res.json({ success: true, clients, phases });
}
