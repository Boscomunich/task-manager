import { PrismaClient } from '@prisma/client'
import crypto  from 'crypto'

const prisma = new PrismaClient()

export async function sendNotification (message: string, type: string, userId: string, projectId?: string) {
    if (!message || !type || !userId) throw new Error ('something went wrong')

    const id = crypto.randomBytes(16).toString('hex');
    const notification = await prisma.notification.create({
        data: {
            id,
            message,
            type,
            projectId,
            userId
        }
    })
    return notification
}

export async function deleteNotification (id: string) {
    if (!id) throw new Error('ID is required');

    const notification = await prisma.notification.delete({
        where: { id },
    });
    return notification
}

export async function updateNotification (id: string) {
    if (!id) throw new Error('ID is required');

    const notification = await prisma.notification.update({
        where: { id },
        data: {
            read: true
        }
    });
    return notification
}