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
        DeleteList(id: $id) {
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
export const ADD_COLABORATORS = gql`
    mutation AddCollaboratorsMutation ($id: ID!, $email: String!, $ownerId: ID!, $userEmail: String! ) {
        AddCollaborators(id: $id, email: $email, ownerId: $ownerId, userEmail: $userEmail) {
            workers{
                id
                username
                email
            }
        }
    }
`
export const REMOVE_COLABORATORS = gql`
    mutation RemoveCollaboratorsMutation ($ownerId: ID!, $id: ID!, $userId: ID ) {
        RemoveCollaborators(id: $id, ownerId: $ownerId, userId: $userId) {
            workers{
                id
                username
                email
            }
        }
    }
`
export const ACCEPT_INVITE = gql`
    mutation AcceptInvite ($projectId: String!, $userId: String! ) {
        AcceptInvite(projectId: $projectId, userId: $userId) {
            workers{
                id
                username
                email
            }
        }
    }
`
export const ADD_USER_TO_CARD = gql`
    mutation IncludeUserToCardMutation ($id: ID!, $userId: ID! ) {
        IncludeUserToCard(id: $id, userId: $userId) {
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
export const MOVE_CARD = gql`
    mutation MoveCardMutation ($id: ID!, $listId: ID!) {
        MoveCard(id: $id, listId: $listId) {
            id
        }
    }
`
export const CREATE_CHECKLIST = gql`
    mutation CreateCheckListMutation ($name: String!, $cardId: ID!) {
        CreateCheckList(name: $name, cardId: $cardId) {
            id
            name
            checked
        }
    }
`
export const UPDATE_CHECKLIST = gql`
    mutation UpdateCheckListMutation ($id: ID!, $checked: Boolean) {
        UpdateCheckList(id: $id, checked: $checked) {
            id
            name
            checked
        }
    }
`
export const DELETE_CHECKLIST = gql`
    mutation DeleteCheckListMutation ($id: ID!) {
        DeleteCheckList(id: $id) {
            id
            name
            checked
        }
    }
`
export const DELETE_NOTIFICATION = gql`
    mutation DeleteNotification ($id: ID!) {
        DeleteNotification (id: $id) {
            id
        }
    }
`
export const UPDATE_NOTIFICATION = gql`
    mutation UpdateNotification ($id: ID!) {
        UpdateNotification (id: $id) {
            id
        }
    }
`