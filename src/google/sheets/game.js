import {SPREADSHEET_ID} from '../../consts/google';

export async function getNextGameId() {
  return Date.now().toString(36).slice(-4).toUpperCase();
}

export async function addGame(gameID, user, setID) {
  const range = 'Games!A:F';

  // Game_id, user_1, user_2, image_set, user_1_select, user_2_select
  const values = [
    [
      gameID,
      user,
      '',
      setID,
      '',
      '',
    ],
  ];

  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values,
    },
  };

  try {
    const response = await gapi.client.sheets.spreadsheets.values.append(
        request,
    );
    console.log('New game added with response:', response);
    return response.status === 200;
  } catch (err) {
    console.log('Error while adding game:', err.message);
    return false;
  }
}
