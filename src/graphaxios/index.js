import axios from "axios";
async function graph(config, operationName, query, variables) {
  const res = await axios.post(config.VUE_APP_GRAPHQL_HTTP, {
    operationName,
    query,
    variables
  });
  return res.data.data;
}
export default graph;
