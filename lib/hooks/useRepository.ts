import axios from "axios"
import repositories, { Repository } from '../api'

const useRepository = <T>(reducer: (_: Repository) => T) => reducer(repositories(axios))

export const mapRepository = useRepository

export default useRepository