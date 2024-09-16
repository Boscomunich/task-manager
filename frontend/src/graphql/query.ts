import { gql } from '@apollo/client';

export const GET_ALL_WORKSPACE = gql`
    query GetAllWorkspaceQuery ($id: ID!) {
        GetAllWorkspace (userId: $id) {
            id
            name
            createdAt
            updatedAt
            description
        }
    }
`
export const GET_WORKSPACE = gql`
    query GetWorkspaceQuery ($id: ID!) {
        GetWorkspace (id: $id) {
            id
            name
            createdAt
            updatedAt
            workers {
                id
                username
                email
            }
            lists {
                id
                name
                description
                createdAt
                updatedAt
                workspaceId
            }
        }
    }
`
export const GET_LIST = gql`
    query GetListQuery ($id: ID!) {
        GetList (id: $id) {
            id
            name
            createdAt
            updatedAt
            cards {
                id
                name
                description
                createdAt
                updatedAt
            }
        }
    }
`