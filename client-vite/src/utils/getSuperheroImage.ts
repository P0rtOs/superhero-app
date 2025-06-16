// src/utils/getSuperheroImageSources.ts

const BACKEND_URL = 'http://localhost:4343';
const FALLBACK_COUNT = 1; // скільки локальних варіантів перевіряти

/**
 * Формує список URL до зображень у порядку пріоритету:
 * 1) перше зображення з бекенду (http://localhost:4343/uploads/...)
 * 2) локальні /images/<nickname>1.png, ...
 * 3) дефолтне /images/default.png
 *
 * @param nickname — нікнейм героя, для локальних файлів
 * @param images — масив URL із бекенду, наприклад ['/uploads/xyz.png']
 */
export function getHeroImageSources(
  nickname: string,
  images?: string[]
): string[] {
  const sources: string[] = [];

  // 1) перший пріоритет — бекендове зображення
  if (images && images.length > 0) {
    // гарантуємо, що воно починається з "/"
    const imagePath = images[0].startsWith('/') ? images[0] : `/${images[0]}`;
    sources.push(`${BACKEND_URL}${imagePath}`);
  }

  // 2) локальні картинки в public/images
  for (let i = 1; i <= FALLBACK_COUNT; i++) {
    sources.push(`/images/${nickname}${i}.png`);
  }

  // 3) дефолтна картинка
  sources.push('/images/default.png');

  return sources;
}
