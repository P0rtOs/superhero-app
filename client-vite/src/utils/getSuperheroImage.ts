// src/utils/getSuperheroImageSources.ts

const BACKEND_URL = 'http://localhost:4343';

export function getHeroImageSources(
  nickname: string,
  primaryImage?: string,
  fallbackCount = 1
): string[] {
  const sources: string[] = [];

  // 1) перший пріоритет — primaryImage з БД, перетворюємо у повний URL
  if (primaryImage) {
    // Якщо в БД збережено '/uploads/xxx.png'
    sources.push(`${BACKEND_URL}${primaryImage}`);
  }

  // 2) локальні картинки в public/images
  for (let i = 1; i <= fallbackCount; i++) {
    sources.push(`/images/${nickname}${i}.png`);
  }

  // 3) дефолт
  sources.push('/images/default.png');

  return sources;
}
