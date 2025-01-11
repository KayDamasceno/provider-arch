// This file register the schemas and generate the OpenAPI document
// It's the logic responsible for creating the OpenAPI document
// based on the zed schemas

import {
  OpenAPIRegistry,
  OpenApiGeneratorV31
} from '@asteasolutions/zod-to-openapi'

import {
  ConflictMovieResponseSchema,
  CreateMovieResponseSchema,
  CreateMovieSchema,
  DeleteMovieResponseSchema,
  GetMovieResponseUnionSchema,
  MovieNotFoundResponseSchema,
  UpdateMovieResponseSchema,
  UpdateMovieSchema
} from '../@types/schema'

import type { ParameterObject } from 'openapi3-ts/oas31'
import e from 'cors'
import exp from 'node:constants'

// register the schemas with the OpenAPI registry

const registry = new OpenAPIRegistry()
registry.register('CreateMovieRequest', CreateMovieSchema)
registry.register('CreateMovieResponse', CreateMovieResponseSchema)
registry.register('GetMovieResponse', GetMovieResponseUnionSchema)
registry.register('MovieNotFoundResponse', MovieNotFoundResponseSchema)
registry.register('DeleteMovieResponse', DeleteMovieResponseSchema)
registry.register('ConflictMovieResponse', ConflictMovieResponseSchema)
registry.register('UpdateMovieRequest', UpdateMovieSchema)
registry.register('UpdateMovieResponse', UpdateMovieResponseSchema)

// constants to avoid repetition

const MOVIE_ID_PARAM: ParameterObject = {
  name: 'id',
  in: 'path',
  required: true,
  schema: {
    type: 'string'
  },
  description: 'Movie ID'
}

const MOVIE_NAME_PARAM: ParameterObject = {
  name: 'name',
  in: 'query',
  required: false,
  schema: {
    type: 'string'
  },
  description: 'Movie name to search for'
}

// register the paths with the OpenAPI generator

registry.registerPath({
  method: 'get',
  path: '/',
  summary: 'Heatl check',
  responses: {
    200: {
      description: 'Server is running',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              messages: { type: 'string', example: 'Server is running' }
            }
          }
        }
      }
    }
  }
})

// register path for getting all movies or filtering by name via query parameter

registry.registerPath({
  method: 'get',
  path: '/movies',
  summary: 'Get all movies or filter by name',
  parameters: [MOVIE_NAME_PARAM],
  description:
    'Retrieve a list of all movies. Opttionally, provide a query parameter to filter by name.',
  responses: {
    200: {
      description:
        'list of movies or a specific movie if the name query is provided',
      content: {
        'application/json': {
          schema: GetMovieResponseUnionSchema
        }
      }
    },
    404: {
      description:
        'Movie not found if the name is provided and does not match any movie',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    }
  }
})

// register path for getting a movie by ID

registry.registerPath({
  method: 'get',
  path: '/movies/{id}',
  summary: 'Get a movie by ID',
  description: 'Retrieve a single movie by its ID',
  parameters: [MOVIE_ID_PARAM],
  responses: {
    200: {
      description: 'Movie data',
      content: {
        'application/json': {
          schema: GetMovieResponseUnionSchema
        }
      }
    },
    404: {
      description: 'Movie not found',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    }
  }
})

// register a path for adding movie

registry.registerPath({
  method: 'post',
  path: '/movies',
  summary: 'Create a new movie',
  description: 'Create a new movie in the system',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateMovieSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Movie created successfully',
      content: {
        'application/json': {
          schema: CreateMovieResponseSchema
        }
      }
    },
    400: {
      description: 'Invalid request body'
    },
    409: {
      description: 'Movie already exists',
      content: {
        'application/json': {
          schema: ConflictMovieResponseSchema
        }
      }
    },
    500: {
      description: 'Unexpected error'
    }
  }
})

// delete movie

registry.registerPath({
  method: 'delete',
  path: '/movies/{id}',
  summary: 'Delete a movie by ID',
  description: 'Delete a movie by its ID',
  parameters: [MOVIE_ID_PARAM],
  responses: {
    200: {
      description: 'Movie deleted successfully',
      content: {
        'application/json': {
          schema: DeleteMovieResponseSchema
        }
      }
    },
    404: {
      description: 'Movie not found',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    }
  }
})

// update movie

registry.registerPath({
  method: 'put',
  path: '/movies/{id}',
  summary: 'Update a movie by ID',
  description: 'Update a movie by its ID',
  parameters: [MOVIE_ID_PARAM],
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateMovieSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Movie updated successfully',
      content: {
        'application/json': {
          schema: UpdateMovieResponseSchema
        }
      }
    },
    404: {
      description: 'Movie not found',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    },

    500: {
      description: 'Unexpected error'
    }
  }
})

const generator = new OpenApiGeneratorV31(registry.definitions)

export const openApiDoc = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Movie API',
    version: '0.0.1',
    description: 'A simple API to manage movies'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local development server'
    },
    {
      url: 'https://movie-api.example.com',
      description: 'Production server'
    }
  ]
})
