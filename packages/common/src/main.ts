import axios, { AxiosError, AxiosResponse } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEmpty = (data: any) => data === null || data === undefined;

export const isObject = (data: any) => data && typeof data === "object";

export const isBlank = (data: "a" | "b" | "c") =>
  isEmpty(data) ||
  (Array.isArray(data) && data.length === 0) ||
  (isObject(data) && Object.keys(data).length === 0) ||
  (typeof data === "string" && data.trim().length === 0);

export class Interceptors {
  public instance;

  public constructor() {
    this.instance = axios.create({
      // baseURL: import.meta.env.VITE_APP_API,
      baseURL: "",
      withCredentials: true,
      // timeout: 1000 * 12,
    });
    // 初始化拦截器
    this.initInterceptors();
  }
  // 为了让http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance;
  }
  // 初始化拦截器
  public initInterceptors() {
    this.instance.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        const body = res.data || {};
        const { ec } = body;
        if (ec === 200 || ec === 0) {
          body.res = true;
          return Promise.resolve(body);
        } else {
          body.res = false;
          return Promise.resolve(body);
        }
      },
      (error: AxiosError) => {
        console.log(error);
        return Promise.resolve({ res: false, em: "请求失败" });
      }
    );
  }
}
