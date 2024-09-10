import { PrismaClient } from '@prisma/client'
import crypto  from 'crypto'
import { createJWT, encryptPassWord } from '../utils/authutils'
import bcrypt from 'bcryptjs'

type ArgsTypes = {
    email: string;
    password: string;
};

interface Register extends ArgsTypes {
    username: string;
}

const prisma = new PrismaClient()

// register user to the database
export async function registerUser (args: Register) {
    const { email, password, username } = args
    console.log(email, password, username)
    //check for neccessary user details
    if ( !email || !password || !username ) throw new Error ('all fields are required')
    // checks if user exist
    const userExist = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (userExist) throw new Error ('user with the email exist')
    //checks if username is available
    const usernameTaken = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    if (usernameTaken) throw new Error ('username already in use')
    //encrypt user password before storage
    const encryptedPassWord = await encryptPassWord(password)
    const userId = crypto.randomBytes(16).toString('hex');
    // create user in database
    const user = await prisma.user.create({
        data: {
            id: userId,
            email,
            username,
            password: encryptedPassWord
        }
    })
    //send msg back to user
    return user
}

//log user in
export async function login (args: ArgsTypes) {
    const { email, password } = args
    //checks for email and password
    if (!password || !email) throw new Error ('all fields are required')
    //get user from database
    const user = await prisma.user.findUnique({
        where: {email}
    })
    //return if user doesnt exist
    if (!user) throw new Error ('wrong password or password')
    //checks if password is correct
    const isMatch = await bcrypt.compare(password, user?.password as string)
    //return user info back if password is correct
    if (isMatch) {
        const token = createJWT (user.id, user.email)
        return {...user, token}
    }
    //return msg if password is incorrect
    throw new Error ('wrong email or password')
}