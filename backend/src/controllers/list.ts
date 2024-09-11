import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

type ListType = {
    name: string;
    description?: string;
    workspaceId: string;
    assignedTo?: string[];
}

type UpdateListType = {
    updatedAt?: string
    id: string
    name?: string
    description?: string
}

export async function createList(args: ListType) {
    const { name, description, workspaceId, assignedTo } = args;
    if (!name || !workspaceId) throw new Error('Name is required');

    const id = crypto.randomBytes(16).toString('hex');

    const data: {
        id: string;
        name: string;
        workspaceId: string;
        description?: string;
        assignedTo?: { connect: { id: string }[] };
    } = {
        id,
        name,
        workspaceId,
    };

    // Conditionally add optional fields
    if (description) {
        data.description = description;
    }

    if (assignedTo && assignedTo.length > 0) {
        data.assignedTo = {
        connect: assignedTo.map(userId => ({ id: userId })),
        };
    }

    const list = await prisma.list.create({
        data,
    });

    return list;
}

export async function includeUserToList (id: string, userId: string) {
    if (!id || !userId) throw new Error('Both id and userId are required');
    
    const updatedList = await prisma.list.update({
        where: { id },
        data: {
            assignedTo: {
                connect: { id: userId }
            },
        },
    });
    return updatedList
}

export async function removeUserFromList (id: string, userId: string) {
    if (!id || !userId) throw new Error('Both id and userId are required');
    
    const updatedList = await prisma.list.update({
        where: { id },
        data: {
            assignedTo: {
                disconnect: { id: userId }
            },
        },
    });
    return updatedList
}

export async function deleteList (id: string) {
    if (!id) throw new Error('ID is required');

    const deletedList = await prisma.list.delete({
        where: { id },
    });

    return deletedList;
}

export async function updateList(args: UpdateListType) {
    const { id, name, description, updatedAt } = args;

    // Check if at least one field is provided
    if (!name && !description && !updatedAt) throw new Error('no updates to be made');

    const data: {
        name?: string;
        description?: string;
        updatedAt?: string;
    } = {};

    // Conditionally add fields to the data object
    if (name) data.name = name;
    if (description) data.description = description;
    if (updatedAt) data.updatedAt = updatedAt;

    const updatedCard = await prisma.card.update({
        where: { id },
        data,
    });

    return updatedCard;
}
