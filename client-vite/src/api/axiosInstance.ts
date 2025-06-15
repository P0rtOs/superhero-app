import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
// Створено для повторення непройшовших запитів
// Легко розширити для логінів (використання рефреш-токенів при 401)

const failedQueue: Array<() => void> = [];

const api = axios.create({
  baseURL: "http://localhost:4343/api/superheroes",
  timeout: 10_000,
});

function shouldRetry(status?: number): boolean {
  if (!status) return false;
  //Немає авторизації або внутрішня помилка сервера — спробувати ще раз
  return status === 401 || (status >= 500 && status <= 599);
}

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const config = err.config as AxiosRequestConfig & { _retry?: boolean };

    const status = err.response?.status;
    if (!config || config._retry || !shouldRetry(status)) {
      return Promise.reject(err);
    }

    config._retry = true;

    return new Promise<AxiosResponse>((resolve, reject) => {
      failedQueue.push(() => {
        api.request(config).then(resolve).catch(reject);
      });
    });
  }
);

// Другий інтерцептор — коли будь-який запит успішно пройшов,
//ми “розблоковуємо” чергу і повторюємо всі відкладені
api.interceptors.response.use((res) => {
  while (failedQueue.length) {
    const fn = failedQueue.shift();
    fn && fn();
  }
  return res;
});

export default api;
