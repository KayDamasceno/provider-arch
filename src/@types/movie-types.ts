import type {z} from 'zod'
import type {
    CreateMovieSchema,
    CreateMovieResponseSchema,
    ConflictMovieResponseSchema,
    GetMovieResponseUnionSchema,
    MovieNotFoundResponseSchema,
    DeleteMovieResponseSchema,
    UpdateMovieSchema,
    UpdateMovieResponseSchema
} from "./schema"

export type CreateMovieRequest = z.infer<typeof CreateMovieSchema>

export type CreateMovieResponse = z.infer<typeof CreateMovieResponseSchema>

export type GetMovieResponse = z.infer<typeof GetMovieResponseUnionSchema>

export type ConflictMovieResponse = z.infer<typeof ConflictMovieResponseSchema>

export type MovieNotFoundResponse = z.infer<typeof MovieNotFoundResponseSchema>

export type DeleteMovieResponse = z.infer<typeof DeleteMovieResponseSchema>

export type UpdateMovieRequest = z.infer<typeof UpdateMovieSchema>

export type UpdateMovieResponse = z.infer<typeof UpdateMovieResponseSchema>