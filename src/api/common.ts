import { useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Key, mutate, MutatorOptions } from 'swr';
import cloneDeep from 'lodash/cloneDeep';

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

export const update = async <P, R = P>(url: string, data: P): Promise<R> => {
  const res = await axiosInstant.put(url, data);
  return res.data;
};

export const objectToSearchParams = (obj: Record<string, string>) => {
  const params = cloneDeep(obj);

  if (!params) return '';

  for (let i in params) {
    !params[i] && delete params[i];
  }

  return '?' + new URLSearchParams(params).toString();
};

export const useCreate =
  (url: string, option: MutatorOptions = {}) =>
  async <T>(data: T) => {
    // let currentList = [];

    // const optimisticData = (list: T[]) => {
    //   currentList = list;
    //   return [data, ...list];
    // };

    // const populateCache = (newCategory: T, list: T[]) => {
    //   return [newCategory, ...list];
    // };

    option = {
      // optimisticData,
      // populateCache,
      revalidate: true,
      ...option
    };

    await mutate(getKey(url), post(url, data), option);
  };

export const useUpdate =
  (url: string, option: MutatorOptions = {}) =>
  async <T>(data: T) => {
    option = {
      revalidate: true,
      ...option
    };

    await mutate(getKey(url), update(url, data), option);
  };

export const getKey = (url: string, obj: Record<string, string> = {}) =>
  url + objectToSearchParams(obj);
