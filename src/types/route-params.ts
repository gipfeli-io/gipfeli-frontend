import {ParsedUrlQuery} from 'querystring'

/**
 * This interface is a workaround for having type-security on dynamic routes with slugs that use [id]. Without it, next
 * throws typescript errors sind params can be either undefined, a string or an array of strings.
 *
 * See https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
 *
 * Todo: check why we need to do it this way and what better options we have.
 */
export interface RouteParams extends ParsedUrlQuery {
    id: string,
}