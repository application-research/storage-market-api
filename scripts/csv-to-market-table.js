import fs from 'fs';
import csv from 'csv-parser';
import DB from '../common/db';

import * as Utilities from '../common/utilities';

const NAME = `csv-to-market-table.js`;

console.log(`RUNNING: ${NAME}`);

const getName = (text) => {
  return text;
};

const run = async () => {
  await DB('market').del();

  fs.createReadStream('market.csv')
    .pipe(csv())
    .on('data', async (row) => {
      const name = getName(row['a']);

      console.log(row); // Print the row to the console

      await Utilities.runQuery({
        queryFn: async () => {
          const result = await DB.from('market').insert({
            name,
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

run();
