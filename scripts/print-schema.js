const { schema } = require("earthstar-graphql");
const { printSchema } = require("earthstar-graphql/node_modules/graphql");
const fs = require("fs");
const path = require("path");

fs.writeFileSync(path.resolve("./data/schema.graphql"), printSchema(schema));
