// Need this for TS to understand the babel-plugin-relay macro
declare module "babel-plugin-relay/macro" {
  export { graphql as default } from "react-relay";
}
