import {SPREADSHEET_ID} from '../../consts/google';

export default async function getGames() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Games!A:F',
    });
  } catch (err) {
    console.log('Error while requesting games', err.message);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length === 0) {
    console.log('Database opened but empty...');
    return;
  }

  console.log('Games Response: ', range);
  // Game_id, user_1, user_2, image_set, user_1_select, user_2_select
  const output = range.values.reduce(
      (acc, row) => {
        const gameID = row[0];
        acc[gameID] = {
          'user_1': row[1],
          'user_2': row[2],
          'image_set': row[3],
          'select_1': row[4],
          'select_2': row[5],
        };
        return acc;
      }, {});

  console.log('Games:', output);
  return output;
}
