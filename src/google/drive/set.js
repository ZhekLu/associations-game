export async function getGameSets() {
  return [
    {'id': 1, 'name': 'Test green set'},
    {'id': 2, 'name': 'Unknown set'},
    {'id': 3, 'name': 'Karazina Life'},
    {'id': 4, 'name': 'Disney'},
  ];
}

export default function getGameSetsDescription() {
  return {
    1: [],
    2: [],
    3: [],
    4: [],
  };
}
