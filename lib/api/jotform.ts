import RequestConfiguration from "./types/RequestConfiguration"
import RepositoryContext from "./types/RepositoryContext"

//import {JotformAnswer, JotformAnswerArrayEntry} from "~/lib/api/models/jotform";

const baseURL = 'https://api.jotform.com'

const endpoints = ({ axios }: RepositoryContext) => ({
  form: (formId: string) => ({
 
    
}),
  submissions: {
    createSubmission: (body: any, configuration: RequestConfiguration = {}) => {
      return axios.post('/api/jotform/create-submission', body, configuration)
        .then(({ data }: any) => data);
    },

    updateSubmission: (submissionId: string, body: any, configuration: RequestConfiguration = {}) => {
      return axios.post(`/api/jotform/update-submission/${submissionId}`, body, configuration)
        .then(({ data }: any) => data);
    }
  }
})

export default endpoints