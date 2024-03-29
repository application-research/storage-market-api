import * as Server from '@common/server';
import * as GoogleSheets from '@common/google';

import DB from '@common/db';

export default async function APIGetSpreadSheet(req, res) {
  await Server.cors(req, res);

  const { clientRows, phaseRows } = await GoogleSheets.getSheetSpecific();

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
      if (!row2['Done']) {
        continue;
      }

      phases.push({
        date: row2['DATE'],
        done: Number(row2['Done']),
        onboarding_remaining: Number(row2['Onboarding-Remaining']),
        done_poc: Number(row2['Done-POC']),
        post_poc_deferment: Number(row2['Post-POC-Deferment']),
        onboarding_poc: Number(row2['Onboarding-POC']),
        blocked_notary: Number(row2['Blocked-Notary']),
        blocked_application: Number(row2['Blocked-Application']),
        blocked_data_prep: Number(row2['Blocked-DataPrep']),
        blocked_setup: Number(row2['Blocked-Setup']),
        blocked_education: Number(row2['Blocked-Education']),
        blocked_partnership: Number(row2['Blocked-Partnership']),
        blocked_funding: Number(row2['Blocked-Funding']),
      });
    }
  }

  res.json({ success: true, clients, phases });
}
