import qs from 'qs'
import request from './request.js'
import _isEmpty from 'lodash/isEmpty';

export function get({ path, query, header, options }) {
  const pStr = !_isEmpty(query) ? `?${qs.stringify({...query})}` : ''
  return request(`${path}${pStr}`, {
    method: 'GET',
    header: {
      Accept: '*/*',
      ...header,
    },
    ...options,
  })
}

export function post({ path, query }) {
  return request(path, {
    method: 'POST',
    header: {
      Accept: 'application/json'
    },
    data: JSON.stringify(query)
  })
}

export function remove({ path, query }) {
  return request(path, {
    method: 'DELETE',
    header: {
      Accept: 'application/json'
    },
    data: JSON.stringify(query)
  })
}

export function put({ path, query }) {
  return request(path, {
    method: 'PUT',
    header: {
      Accept: 'application/json'
    },
    data: JSON.stringify(query)
  })
}