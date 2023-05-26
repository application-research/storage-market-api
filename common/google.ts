const { GoogleSpreadsheet } = require('google-spreadsheet');
const _ = require('lodash');

const SPREADSHEET_ID = `1OnqXfA8FTDSDFbSJ5mBi6rPhmQKFGGd5n9RBTK0KHew`;

export async function getRowData() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const private_key = _.replace(process.env.GOOGLE_PRIVATE_KEY, new RegExp('\\\\n', 'g'), '\n');

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  return rows;
}

export async function getSheetMultiple(index) {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const private_key = _.replace(process.env.GOOGLE_PRIVATE_KEY, new RegExp('\\\\n', 'g'), '\n');

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const phasesSheet = doc.sheetsByIndex[2];
  const secondRows = await phasesSheet.getRows();

  return { clientRows: rows, phaseRows: secondRows };
}
