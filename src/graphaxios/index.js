import axios from "axios";
async function graph(operationName, query, variables) {
  const res = await axios.post(process.env.VUE_APP_GRAPHQL_HTTP, {
    operationName,
    query,
    variables
  });
  return res.data.data;
}
export default graph;
