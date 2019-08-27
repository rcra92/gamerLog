import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(value, callback = null) {
  let favorites = await getData();
  favorites = favorites ? await JSON.parse(favorites) : []
  await favorites.push(value)
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites), () => {
        callback ? callback() : null
    });
  } catch (e) {
    console.warn('FAIL');
  }
}

export async function getData() {
  try {
    const value = await AsyncStorage.getItem('favorites');
    return value;
  } catch (e) {
    // error reading value
  }
}

export async function removeValue(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
}
