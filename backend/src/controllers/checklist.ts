import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

type CheckListType = {
    name: string;
    cardId: string
}

export async function createCheckList (args: CheckListType) {
    const { name, cardId } = args
    if ( !name || !cardId ) throw new Error ('all fields are required') 
    const id = crypto.randomBytes(16).toString('hex');
    const checkList = await prisma.checkList.create({
        data: {
            id,
            name,
            cardId
        }
    })
    return checkList
}

export async function deleteCheckList (id: string) {
    if (!id) throw new Error('ID is required');

    const deletedCheckList = await prisma.checkList.delete({
        where: { id },
    });

    return deletedCheckList;
}

export async function updateCheckList (id: string, checked: boolean) {
    if (!id) throw new Error('ID is required');

    const updatedCheckList = await prisma.checkList.update({
        where: { id },
        data: {
            checked: checked
        }
    });

    return updatedCheckList;
}