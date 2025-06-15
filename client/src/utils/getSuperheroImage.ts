export function getHeroImage(nickname: string, images?: string[], fallbackCount = 3): string {
  if (images && images.length > 0) {
    return images[0];
  }

  // 2. Пробуємо сформувати локальний шлях (public/images/...) за нікнеймом
  for (let i = 1; i <= fallbackCount; i++) {
    const localPath = `/images/${nickname}${i}.png`;
    console.log(`Checking local path: ${localPath}`);
    //Технічно ми не можемо перевірити чи існує файл в public
    return localPath;
  }

  return '/images/default.png';
}
