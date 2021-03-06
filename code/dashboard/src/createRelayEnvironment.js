import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

const __RELAY_API_ENDPOINT__ = 'https://api.graph.cool/relay/v1/cjcz40h3u0j3u01588xw2yeph'
function fetchQuery(
  operation,
  variables,
) {
  return fetch(__RELAY_API_ENDPOINT__, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

const source = new RecordSource()
const store = new Store(source)

export default new Environment({
  network,
  store,
})