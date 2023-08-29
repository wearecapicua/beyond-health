import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const onRequest = (config: AxiosRequestConfig) => config
const onResponse = <T>(response: AxiosResponse<T>) => response

const onRequestError = (error: any) => Promise.reject(error)
const onResponseError = (error: any) => Promise.reject(error)

const instance = axios.create({})

// @ts-ignore
instance.interceptors.request.use(onRequest, onRequestError)
instance.interceptors.response.use(onResponse, onResponseError)

export default instance