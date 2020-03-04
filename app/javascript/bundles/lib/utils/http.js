import request from 'superagent';
import { GRAPHQL_URL } from './constants';

export const graphQLRequest = ({ type, query, variables, data, queries }) => {
  switch(type) {
    case 'multipart':
      return whenMultipart({ query, data: data || {} });
    default:
      return whenJSON({ query, variables, data: data || {}, queries });
  }
};

const whenMultipart = ({ query, variables, data }) => {
  let requestObj = request.post(GRAPHQL_URL).field('query', query);

  for (let key in data) {
    if (data[key] instanceof File || data[key] instanceof Blob) {
      requestObj = requestObj.attach(key, data[key], data[key].name || data[key].filename);
    } else if (data[key]) {
      requestObj = requestObj.field(key, data[key]);
    }
  };
  return requestObj.then(parseResponse);
};

const whenJSON = ({ query, data, queries, variables }) => {
  return request.post(GRAPHQL_URL)
    .set('Accept', 'application/json')
    .send({ query, ...data, queries, variables })
    .then(res => parseResponse(res, queries));
};

const parseResponse = (res, queries) => {
  if (queries) {
    let resp = {};
    let key;
    res.body.forEach((bodyElement, index) => {
      if (bodyElement.data) {
        key = Object.keys(bodyElement.data)[0];
        if(queries[index].responseKey) {
          resp[queries[index].responseKey] = bodyElement.data[key];
        } else {
          resp[key] = bodyElement.data[key];
        }
      } else {
        // eslint-disable-next-line
        console.error(bodyElement);
        return {};
      }
    });
    return resp;
  }
  if (res.body.data) {
    return Object.values(res.body.data)[0];
  }

  throw res.body;
};
