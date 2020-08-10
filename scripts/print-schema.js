const { schema } = require("earthstar-graphql");
const { printSchema } = require("graphql");
const fs = require("fs");
const path = require("path");

fs.writeFileSync(path.resolve("./data/schema.graphql"), printSchema(schema));
