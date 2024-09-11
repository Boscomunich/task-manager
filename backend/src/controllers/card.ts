import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

type CardType = {
    name: string;
    listId: string;
    description?: string;
    assignedTo?: string[];
    endDate?: string
    startDate?: string
}

type UpdateCardType = {
    id: string
    updatedAt?: string
    name?: string;
    listId?: string;
    description?: string;
    endDate?: string
    startDate?: string
}

export async function createCard(args: CardType) {
    const { name, description, listId, assignedTo, startDate, endDate } = args;
    if (!name || !listId) throw new Error('Name is required');

    const id = crypto.randomBytes(16).toString('hex');

    const data: {
        id: string;
        name: string;
        listId: string;
        description?: string;
        startDate?: string;
        endDate?: string;
        assignedTo?: { connect: { id: string }[] };
    } = {
        id,
        name,
        listId,
    };

    // Conditionally add optional fields
    if (description) data.description = description;

    if (startDate) data.startDate = startDate

    if (endDate) data.endDate = endDate

    if (assignedTo && assignedTo.length > 0) {
        data.assignedTo = {
        connect: assignedTo.map(userId => ({ id: userId })),
        };
    }

    const card = await prisma.card.create({
        data,
    });

    return card;
}

export async function updateCard(args: UpdateCardType) {
    const { id, name, description, listId, startDate, endDate, updatedAt } = args;

    // Check if at least one field is provided
    if (!name && !description && !listId && !startDate && !endDate && !updatedAt) throw new Error('no updates to be made');

    const data: {
        name?: string;
        listId?: string;
        description?: string;
        startDate?: string;
        endDate?: string;
        updatedAt?: string;
    } = {};

    // Conditionally add fields to the data object
    if (name) data.name = name;
    if (description) data.description = description;
    if (listId) data.listId = listId;
    if (startDate) data.startDate = startDate;
    if (endDate) data.endDate = endDate;
    if (updatedAt) data.updatedAt = updatedAt;

    const updatedCard = await prisma.card.update({
        where: { id },
        data,
    });

    return updatedCard;
}

export async function includeUserToCard (id: string, userId: string) {
    if (!id || !userId) throw new Error('Both id and userId are required');
    
    const updatedList = await prisma.card.update({
        where: { id },
        data: {
            assignedTo: {
                connect: { id: userId }
            },
        },
    });
    return updatedList
}

export async function removeUserFromCard (id: string, userId: string) {
    if (!id || !userId) throw new Error('Both id and userId are required');
    
    const updatedList = await prisma.card.update({
        where: { id },
        data: {
            assignedTo: {
                disconnect: { id: userId }
            },
        },
    });
    return updatedList
}

export async function deleteCard (id: string) {
    if (!id) throw new Error('ID is required');

    const deletedList = await prisma.card.delete({
        where: { id },
    });

    return deletedList;
}