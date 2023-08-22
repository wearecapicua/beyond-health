import RequestConfiguration from "./types/RequestConfiguration"
import RepositoryContext from "./types/RepositoryContext"

//import {JotformAnswer, JotformAnswerArrayEntry} from "~/lib/api/models/jotform";

const baseURL = 'https://api.jotform.com'

const endpoints = ({ axios }: RepositoryContext) => ({
  form: (formId: string) => ({
 
    
}),

submissions: (body: any, configuration: RequestConfiguration = {}) =>{
  console.log('Received body:', body);
  console.log({configuration})
  return axios.post('/api/jotform', body, configuration)
    .then(({ data }: any) => data)
}
})

export default endpoints