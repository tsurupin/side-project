import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const iconColor = 'white';
const iconSize = 32;

const icons = {};

export function loadIcon(name) {
    return MaterialCommunityIcons.getImageSource(name, iconSize, iconColor);
}

export async function loadIcons(names) {
    const tasks = names.map((name) => loadIcon(name));
    const results = await Promise.all(tasks);
    const set = results.map((item, index) => ({ [names[index]]: item }));
    return Object.assign(icons, ...set);
}

export function getIcon(name) {
    return icons[name];
}
