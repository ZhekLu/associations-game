import {SPREADSHEET_ID} from '../../consts/google';
import getGames from './store';

export function gamesToList(games) {
  // Game_id, user_1, user_2, image_set, user_1_select, user_2_select
  return Object.entries(games).map(
      ([gameID, {user_1, user_2, select_1, select_2, image_set}]) => (
        [gameID, user_1, user_2, image_set, select_1, select_2]
      ),
  );
}

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

export async function updateGame(gameID, setID, gameInfo) {
  const range = `Games!A:F`;
  const games = await getGames();
  games[gameID] = {
    user_1: gameInfo.user_1,
    user_2: gameInfo.user_2,
    image_set: setID,
    select_1: gameInfo.select_1,
    select_2: gameInfo.select_2,
  };

  const values = gamesToList(games);
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values,
    },
  };

  try {
    const response = await gapi.client.sheets.spreadsheets.values.update(request);
    console.log('Game updated with response:', response);
  } catch (err) {
    console.log('Error while updating game:', err.message);
  }
}
