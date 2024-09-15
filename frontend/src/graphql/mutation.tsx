import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation RegisterMutation ($username: String!, $email: String!, $password: String! ) {
        Register (email: $email, password: $password, username: $username) {
            id
            email
            username
            verified
            token
        }
    }
`

export const LOGIN = gql`
    mutation LoginMutation ($email: String!, $password: String! ) {
        Login (email: $email, password: $password) {
            id
            email
            username
            verified
            token
        }
    }
`