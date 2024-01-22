import { AxiosInstance } from 'axios'
import mapToQueryString from 'utils/mapToQueryString'

interface RepositoryContext {
	axios: AxiosInstance
	mapToQueryString: typeof mapToQueryString
}

export default RepositoryContext
