import { query } from "earthstar-graphql";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
} from "relay-runtime";
import { Context } from "earthstar-graphql/dist/types";

function createFetchQuery(ctx: Context) {
  return async (request: RequestParameters, variables: Variables) => {
    const res = await query(request.text || ``, variables, ctx);

    // Have to do this otherwise I get weird errors because graphql-js returns weirdly shaped objects
    // should just use relay-local-schema for this
    return JSON.parse(JSON.stringify(res));
  };
}

function createEnvironment(ctx: Context) {
  return new Environment({
    network: Network.create(createFetchQuery(ctx)),
    store: new Store(new RecordSource()),
  });
}

export default createEnvironment;
