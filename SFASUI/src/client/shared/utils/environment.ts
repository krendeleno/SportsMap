/**
 * Флаг сообщающий, что приложение выполняется на стороне сервера.
 */
export const IS_SERVER = typeof window === 'undefined';

/**
 * Флаг сообщающий, что приложение выполняется на стороне клиента.
 */
export const IS_CLIENT = !IS_SERVER;

/**
 * Базовый путь, по которому доступно приложение (например, /lab)
 * Задается в next.config.js
 */
export const BASE_PATH = process.env.BASE_PATH;
export const BACKEND = process.env.BACKEND;
export const BACKEND_FULL = process.env.BACKEND_FULL;
