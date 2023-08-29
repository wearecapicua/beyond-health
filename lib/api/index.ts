import { AxiosInstance } from 'axios'
import mapToQueryString from 'utils/mapToQueryString'

import jotform from './jotform'

/**
 * this interface represents the callback value type of
 * the useRepository hook, every type here will be recognized there
 * @important every time here need to be applied in the repositories object below
 */

/**
 * add here every new repository file
 */
const endpointsCollection = { jotform }

type EndpointsCollection = typeof endpointsCollection

/**
 * this type infers the return type of each item in the endpointsCollection object
 */
export type Repository = {
  [Key in keyof EndpointsCollection]: ReturnType<EndpointsCollection[Key]>
}

const repository = (axios: AxiosInstance): Repository => {
  /**
   * Object.entries transforms `repositories`
   * from {
   *  appointments: ({ axios, mapToQueryString }) => ({...}),
   *  patients: ({ axios, mapToQueryString }) => ({...}),
   *  ...
   * }
   * to[
   *  ['appointments', ({ axios, mapToQueryString }) => ({...})],
   *  ['patients', ({ axios, mapToQueryString }) => ({...})],
   *  ...
   * ]
   */
  const entries = Object.entries(endpointsCollection)

  return entries.reduce((accumulator, [name, repository]) => ({
    /**
     * starting from an empty object `{}`, Array.reduce iterates the new shape of
     * entries `[[]]` and for each item assign the first index of the inner array as
     * the attribute key of the new json object and se second index of the inner array
     * (being a function) is executed passing axios and mapToQueryString in order to assign
     * its value as the value of the first index attribute resulting in something like
     * {
     *  appointments: {
     *    someEndpoint: (endpointParams) => {...},
     *    ...
     *  },
     *  patients: {
     *    someEndpoint: (endpointParams) => {...},
     *    ...
     *  },
     *  ...
     * }
     */
    ...accumulator,
    /**
     * This line makes the magic, it executes every endpoint function passing
     * its required context in order to be used inside them
     */
    [name]: repository({ axios, mapToQueryString })
  }), {} as Repository)
}

export default repository
