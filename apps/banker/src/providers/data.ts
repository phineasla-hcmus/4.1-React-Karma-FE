import { fetchUtils } from 'react-admin';
import type {
  DataProvider,
  GetListParams,
  GetOneParams,
  UpdateParams,
  UpdateManyParams,
  GetManyParams,
  CreateParams,
  DeleteParams,
} from 'react-admin';

import { Paginated } from '../types/generics';

const apiUrl = 'http://localhost:3003';

const httpClient = (url: string, options: any) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

export type GetQueryParams = {
  page: string;
  size: string;
};

export default {
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination;
    const defaultQueryParams = {
      page: `${page}`,
      size: perPage.toString(),
      sender: '',
    };
    const query = defaultQueryParams;

    return httpClient(
      `${apiUrl}/${resource}?${new URLSearchParams(query).toString()}`,
      {
        method: 'GET',
      }
    ).then(({ json }: { json: Paginated<unknown> }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  getOne: async (resource: string, params: GetOneParams) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'GET',
    }).then(({ json }) => {
      return { data: json };
    });
  },

  getMany: async (resource: string, params: GetManyParams) => {
    if (resource === 'roles' || resource === 'skills') {
      const query = {
        ids: JSON.stringify(params.ids),
      };
      return httpClient(
        `${apiUrl}/${resource}/many?${new URLSearchParams(query).toString()}`,
        {
          method: 'GET',
        }
      ).then(({ json }) => ({
        data: json,
        total: json.length,
      }));
    }

    return httpClient(`${apiUrl}/${resource}/all`, {
      method: 'GET',
    }).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  create: async (resource: string, params: CreateParams) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json, total: json.length }));
  },

  update: async (resource: string, params: UpdateParams) => {
    if (resource === 'clients') {
      return httpClient(`${apiUrl}/bankers/${params.data.maNV}/recharge`, {
        method: 'PATCH',
        body: JSON.stringify(params.data),
      }).then(() => ({ data: { id: params.id, ...params.data } }));
    }
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(() => ({ data: { id: params.id, ...params.data } }));
  },

  updateMany: async (resource: string, params: UpdateManyParams) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(({ status }) => status === 204 && { data: params.data });
  },

  delete: async (resource: string, params: DeleteParams) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ status }) => status === 204 && { data: params.previousData });
  },
} as DataProvider<string>;
