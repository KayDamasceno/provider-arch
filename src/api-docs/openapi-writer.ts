import fs from 'node:fs'
import path from 'node:path'
import { stringify } from 'yaml'
import { openApiDoc } from './openapi-generator'

// Generates openaAPI docs with Zod

// Convert openAPI document to YAML
const yamlDoc = stringify(openApiDoc)

const scriptDir = path.resolve(__dirname)

fs.writeFileSync(`${scriptDir}/../openapi.yaml`, yamlDoc)

console.log('OpenAPI document generated in YAML format')

// Json version
const jsonDoc = JSON.stringify(openApiDoc, null, 2)

// Write the json file
fs.writeFileSync(`${scriptDir}/../openapi.json`, jsonDoc)

console.log('OpenAPI document generated in JSON format')
