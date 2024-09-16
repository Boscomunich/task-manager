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
export const CREATE_WORKSPACE = gql`
    mutation CreateWorkspaceMutation ($name: String!, $description: String!, $userId: ID! ) {
        CreateWorkspace(name: $name, description: $description, userId: $userId) {
            id
        }
    }
`
export const CREATE_LIST = gql`
    mutation CreateListMutation ($name: String!, $description: String, $workspaceId: ID! ) {
        CreateList(name: $name, description: $description, workspaceId: $workspaceId) {
            id
            name
            description
        }
    }
`
export const CREATE_CARD = gql`
    mutation CreateCardMutation ($name: String!, $description: String, $listId: ID! ) {
        CreateCard(name: $name, description: $description, listId: $listId) {
            id
            name
            description
        }
    }
`