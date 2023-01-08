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
import { LegendToggleRounded } from '@mui/icons-material';

import { Paginated } from '../types/generics';

const apiUrl = 'http://localhost:3003';

const httpClient = fetchUtils.fetchJson;

export type GetQueryParams = {
  page: string;
  size: string;
  bankID?: string;
  from?: string;
  to?: string;
};

export default {
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination;
    let defaultQueryParams: GetQueryParams = {
      page: `${page}`,
      size: perPage.toString(),
    };

    if (params.filter.bankID) {
      defaultQueryParams = {
        ...defaultQueryParams,
        bankID: `${params.filter.bankID}`,
      };
    }
    if (params.filter.from) {
      defaultQueryParams = {
        ...defaultQueryParams,
        from: `${new Date(params.filter.from)}`,
      };
    }
    if (params.filter.to) {
      defaultQueryParams = {
        ...defaultQueryParams,
        to: `${new Date(params.filter.to)}`,
      };
    }
    const query: GetQueryParams = defaultQueryParams;
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

    return httpClient(`${apiUrl}/${resource}`, {
      method: 'GET',
    }).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  create: async (resource: string, params: CreateParams) => {
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify({
        hoTen: params.data.hoTen,
        sdt: params.data.sdt,
      }),
    }).then(({ json }) => ({ data: json, total: json.length }));
  },

  update: async (resource: string, params: UpdateParams) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        hoTen: params.data.nhanVien.hoTen,
        sdt: params.data.nhanVien.sdt,
      }),
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
