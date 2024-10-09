import { PrismaClient } from '@prisma/client'
import crypto  from 'crypto'
import { sendNotification } from '../utils/notification'

type WorkSpaceType = {
    name: string,
    description: string,
    userId: string
}

const prisma = new PrismaClient()

export async function CreateWorkSpace (args: WorkSpaceType) {
    const { name, description, userId } = args
    if (!name || !description || !userId) throw new Error ('all fields are required')
    const id = crypto.randomBytes(16).toString('hex');
    const workSpace =  await prisma.workspace.create ({
        data: {
            id,
            name,
            description,
            userId
        }, 
        include: {
            owner: true,
        },
    })
    return workSpace
}

export async function addWorkSpaceCollaborator (id: string, email: string, ownerId: string,  userEmail: string) {
    if (!id || !email || !userEmail) throw new Error ('all fields are required')

    userEmail = userEmail.trim();

    const workSpace = await prisma.workspace.findUnique({
        where: {id: id},
    })

    if (workSpace?.userId != ownerId) throw new Error ('non owner cannot invite members')

    const user = await prisma.user.findFirst({
        where: {
            email: userEmail
        }
    })

    if (!user) throw new Error ('user with this email doesnt exist')

    const userExistsInWorkspace = await prisma.workspace.findFirst({
        where: {
            id,
            workers: {
            some: {
                id:user.id
            }
            }
        }
    });

    if (userExistsInWorkspace) throw new Error ('user already added')
    

    const message = `a user with this emai ${email} has invited  you to join their board; please reject if you don’t know this user`

    const notification = await sendNotification(message, 'invitation', user.id, id)
    return notification
}

export async function acceptInvite (projectId: string, userId: string) {
    const updatedWorkspace = await prisma.workspace.update({
        where: { id: projectId },
        data: {
            workers: {
                connect: { id: userId }
            },
        },
    });
    return updatedWorkspace
}

export async function removeWorkSpaceCollaborator (owner:string, id: string, userId: string) {
    if (!id || userId || !owner) throw new Error ('all fields are required')
    const workspace = await prisma.workspace.findUnique({
        where: { id },
        select: { userId: true }
    });

    if (workspace?.userId !== owner) throw new Error('You are not authorized to perform this action')
        
    const updatedWorkspace = await prisma.workspace.update({
        where: { id },
        data: {
            workers: {
                disconnect: { id: userId }
            },
        },
    });
    return updatedWorkspace
}

export async function deleteWorkspace (id: string) {
    if (!id) throw new Error('ID is required');

    const deletedWorkspace = await prisma.card.delete({
        where: { id },
    });

    return deletedWorkspace;
}