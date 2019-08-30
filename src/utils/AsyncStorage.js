import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export async function storeData(value, callback = null) {
  let favorites = await getData();
  favorites = favorites ? await JSON.parse(favorites) : [];
  await favorites.push(value);
  await persistData(favorites);
  callback();
  return;
}

export async function getData() {
  try {
    const value = await AsyncStorage.getItem('favorites');
    return value;
  } catch (e) {
    // error reading value
  }
}

export async function removeValue(value) {
  let favorites = await getData();
  favorites = await JSON.parse(favorites);
  console.log('>>>>>>', favorites, value);
  _.remove(favorites, n => {
    return n.slug === value.slug;
  });
  console.log('>>>>>>', favorites);
  await persistData(favorites);
  return;
}

async function persistData(favorites) {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (e) {
    console.warn('FAIL');
  }
}
