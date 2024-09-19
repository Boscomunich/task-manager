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
export const DELETE_LIST = gql`
    mutation DeleteListMutation ($id: ID! ) {
        CreateList(id: $id) {
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
            createdAt
            updatedAt
        }
    }
`
export const DELETE_CARD = gql`
    mutation DeleteCardMutation ($id: ID! ) {
        DeleteCard(id: $id) {
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`
export const ADD_USER_TO_CARD = gql`
    mutation IncludeUserToCardMutation ($id: ID!, $userEmail: String! ) {
        IncludeUserToCard(id: $id, userEmail: $userEmail) {
            assignedTo{
                id
                username
                email
            }
        }
    }
`
export const REMOVE_USER_FROM_CARD = gql`
    mutation RemoveUserFromCardMutation ($id: ID!, $userId: ID! ) {
        RemoveUserFromCard(id: $id, userId: $userId) {
            assignedTo{
                id
                username
                email
            }
        }
    }
`
export const UPDATE_CARD = gql`
    mutation UpdateCardMutation ($id: ID!, $listId: ID, $name: String, $description: String, $startDate: String, $endDate: String, $updatedAt: String ) {
        UpdateCard(id: $id, listId: $listId, name: $name, description: $description, startDate: $startDate, endDate: $endDate, updatedAt: $updatedAt) {
            id
        }
    }
`