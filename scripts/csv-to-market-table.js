import fs from 'fs';
import csv from 'csv-parser';
import DB from '../common/db';

import * as Utilities from '../common/utilities';

const NAME = `csv-to-market-table.js`;

console.log(`RUNNING: ${NAME}`);

const getName = (text) => {
  return text;
};

const convertDollarsToCents = (text) => {
  const dollars = Number(text);

  if (isNaN(dollars)) {
    return null;
  }

  const cents = dollars * 100;
  return cents;
};

const convertToTrueFalse = (text) => {
  if (text === 'Yes') {
    return true;
  }

  return false;
};

const run = async () => {
  await Utilities.runQuery({
    queryFn: async () => {
      const result = await DB.from('market').insert({
        name: 'Estuary',
        plan: 'Powered by IPFS & Filecoin based on token price',
        gb_storage_limit: null,
        gb_per_day_cents: 0.0000064 * 100,
        gb_per_month_cents: 0.0000064 * 100 * (365 / 12),
        gb_per_year_cents: 0.0000064 * 100 * 365,
        web3: true,
        fixed_plan_cents: null,
        fixed_plan_interval: null,
        replication_included: false,
        url: null,
        src_logo: null,
        metadata: {},
        links: {},
        data: {},
      });
    },
    errorFn: (e) => {
      console.log(e);
    },
    label: `ADD_ESTUARY_REAL_TO_MARKET_TABLE_IN_DATABASE`,
  });
};

/*

const run = async () => {
  // NOTE(jim)
  // Do not run this command unless you want pain.
  // await DB('market').del();

  fs.createReadStream('market.csv')
    .pipe(csv())
    .on('data', async (row) => {
      const name = getName(row['a']);

      console.log(row); // Print the row to the console

      await Utilities.runQuery({
        queryFn: async () => {
          const result = await DB.from('market').insert({
            name,
            plan: name,
            gb_storage_limit: null,
            gb_per_day_cents: convertDollarsToCents(row['c']),
            gb_per_month_cents: convertDollarsToCents(row['d']),
            gb_per_year_cents: convertDollarsToCents(row['e']),
            web3: convertToTrueFalse(row['f']),
            fixed_plan_cents: null,
            fixed_plan_interval: null,
            replication_included: false,
            url: null,
            src_logo: null,
            metadata: {},
            links: {},
            data: {},
          });
        },
        errorFn: (e) => {
          console.log(e);
        },
        label: `ADD_${name}_TO_MARKET_TABLE_IN_DATABASE`,
      });
    })
    .on('end', () => {
      console.log(`FINISHED: ${NAME}`);
    });
};

*/

run();
