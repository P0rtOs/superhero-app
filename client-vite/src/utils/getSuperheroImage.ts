//Для отримання соурса зображення, в компоненті пріорітет йде з 1
// 1. Статика з сервера
// 2. Зображення з nickname
// 3. Зображення за замовчуванням

const BACKEND_URL = 'http://localhost:4343';

export function getHeroImageSources(nickname: string, image: string): string[] {
  const sources: string[] = [];

  const path = BACKEND_URL + image;
  console.log(path);
  sources.push(`${path}`);

  sources.push(`/images/${nickname}.png`);

  sources.push('/images/default.png');

  return sources;
}
