import {getSession} from 'next-auth/react'
import {GetServerSidePropsContext, NextPageContext, PreviewData} from 'next'
import {Session} from 'next-auth'
import {ParsedUrlQuery} from 'querystring'

type PropFunction = {
    props: object
}

/**
 * This function can be used in place of getServerSideProps whenever a page shall be accessible by authenticated users
 * only.
 *
 * Based on https://github.com/nextauthjs/next-auth/issues/1210#issuecomment-851606553, but fixed and adjusted for
 * typehinting.
 * @param context Current request context
 * @param fn? Optional function that returns further props that are merged with the session prop
 */
export const withAuthenticatedOrRedirect = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, fn?: (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, session: Session) => Promise<PropFunction>) => {
    const session = await getSession(context)
    const isUser = !!session?.user

    if (!isUser) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

    let response = {props: {session}}

    if (fn) {
        const res = await fn(context, session)

        response = {
            props: {
                ...response.props,
                ...res.props
            }
        }
    }


    return response
}