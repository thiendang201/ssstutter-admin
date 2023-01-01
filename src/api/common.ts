import { useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Key, mutate, MutatorOptions } from 'swr';

export const axiosInstant = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
});

export const fetcher = async <Data = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<Data> => {
  const res = await axiosInstant.get(url, config);
  return res.data;
};

export const post = async <P, R = P>(url: string, data: P): Promise<R> => {
  const res = await axiosInstant.post(url, data);
  return res.data;
};

export const objectToSearchParams = (
  obj:
    | string
    | URLSearchParams
    | string[][]
    | Record<string, string>
    | undefined
) => (!obj ? '' : '?' + new URLSearchParams(obj).toString());

export const useCreate =
  (url: string, key: Key = url, option: MutatorOptions = {}) =>
  <T>(data: T) => {
    let currentList = [];

    const optimisticData = (list: T[]) => {
      currentList = list;
      return [data, ...list];
    };

    const populateCache = (newCategory: T, list: T[]) => {
      return [newCategory, ...list];
    };

    option = {
      optimisticData,
      populateCache,
      revalidate: false,
      ...option
    };

    mutate(key, post(url, data), option);
  };
