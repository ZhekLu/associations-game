export async function getGameSets() {
  return [
    {'id': 1, 'name': 'Test green set'},
    {'id': 2, 'name': 'Unknown set'},
  ];
}

export default function getGameSetsDescription() {
  return {
    1: [],
    2: [],
  };
}
