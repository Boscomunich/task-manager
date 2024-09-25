import { PrismaClient } from '@prisma/client'
import crypto  from 'crypto'

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

export async function addWorkSpaceCollaborator (id: string, userEmail: string) {
    if (!id || !userEmail) throw new Error ('all fields are required')
    console.log(userEmail)
    const user = await prisma.user.findFirst({
        where: {
            email: userEmail
        }
    })
    console.log(user)
    
    if (!user) throw new Error ('user with this email doesnt exist')

    const updatedWorkspace = await prisma.workspace.update({
        where: { id },
        data: {
            workers: {
                connect: { id: user.id }
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