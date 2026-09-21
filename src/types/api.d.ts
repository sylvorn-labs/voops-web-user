import type { AxiosInstance } from 'axios';
import { isAxiosError } from 'axios';

import { axiosInstance } from '@/lib/axios';
import { CONFIG } from '@/configs/config';

/* Global Response Type From API */
export type ApiResponse<T = undefined> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

export type ErrorResponse = ApiResponse;

type ConstructorParams = {
  baseVersion?: string;
  baseGroup?: string;
  baseRoute: string;
};

/* Base API Class */
export abstract class BaseAPI {
  private static instances: Map<{ new (): BaseAPI }, BaseAPI> = new Map();
  private readonly BASE_URL = CONFIG.BackendApiBaseUrl;
  private readonly BASE_VERSION: string;
  private readonly BASE_GROUP: string;
  private readonly BASE_ROUTE: string;

  protected constructor({
    baseVersion,
    baseGroup,
    baseRoute,
  }: ConstructorParams) {
    if (baseVersion) {
      this.BASE_VERSION = baseVersion;
    } else {
      this.BASE_VERSION = CONFIG.BackendApiBaseVersion;
    }

    if (baseGroup) {
      this.BASE_GROUP = baseGroup;
    } else {
      this.BASE_GROUP = CONFIG.BackendApiBaseGroup;
    }

    this.BASE_ROUTE = baseRoute;
  }

  protected getServiceUrl(): string {
    return `${this.BASE_URL}/${this.BASE_VERSION}/${this.BASE_GROUP}/${this.BASE_ROUTE}`;
  }

  protected getEndpointUrl(endpoint: string): string {
    return `${this.getServiceUrl()}/${endpoint}`;
  }

  protected getAPIClient(): AxiosInstance {
    return axiosInstance;
  }

  public static getInstance<T extends BaseAPI>(this: { new (): T }): T {
    // Use the constructor itself as the cache key. Relying on `this.name`
    // breaks in minified/production builds where class names are stripped
    // (e.g. `""`), collapsing every API into a single shared singleton and
    // producing wrong/missing requests. The constructor reference is stable
    // across dev and prod.
    if (!BaseAPI.instances.has(this)) {
      BaseAPI.instances.set(this, new this());
    }
    return BaseAPI.instances.get(this) as T;
  }

  public static handleAxiosError(error: unknown): ErrorResponse {
    if (isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
          success: false,
          data: undefined,
          message: error.response.data.message || 'An error occurred',
          error: error.message,
        };
      } else if (error.request) {
        // The request was made but no response was received
        return {
          success: false,
          data: undefined,
          message: 'No response received from server',
          error: error.message,
        };
      } else {
        // Something happened in setting up the request that triggered an error
        return {
          success: false,
          data: undefined,
          message: 'Unknown error',
          error: error.message,
        };
      }
    } else {
      // Handle non-Axios errors
      return {
        success: false,
        data: undefined,
        message: 'Unknown error',
        error: 'Unknown error',
      };
    }
  }
}
