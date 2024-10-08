import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetUserQuery ($id: ID!) {
        GetUser (id: $id) {
            id
            username
            email
            workspacesOwned{
                id
                name
                userId
                createdAt
                updatedAt
                description
            }
            workspacesWorking {
                id
                name
                userId
                createdAt
                updatedAt
                description
            }
            notification {
                id
                type
                projectId
                read
                message
                createdAt
            }
        }
    }
`

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
            userId
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
                listId
            }
            workspace {
                userId
                workers {
                    id
                    username
                    email
                }
            }
        }
    }
`
export const GET_CARD = gql`
    query GetCardQuery ($id: ID!) {
        GetCard (id: $id) {
            id
            name
            description
            createdAt
            updatedAt
            startDate
            endDate
            listId
            assignedTo {
                id
                username
                email
            }
            checkList {
                id
                name
                checked
            }
        }
    }
`
export const GET_NOTIFICATION = gql`
    query GetNotificationQuery ($userId: ID!) {
        GetNotification (userId: $UserId) {
            id
            type
            projectId
            read
            message
            createdAt
        }
    }
`