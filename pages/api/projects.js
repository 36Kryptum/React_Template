import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await addProject(req, res)
    }
    else if (req.method === 'GET') {
        return await readProject(req, res);
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}

async function readProject(req, res) {
    try {
        const allProjects = await prisma.projects.findMany();
        return res.status(200).json(allProjects, {success: true});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Error reading all projects'}, {success: false});
    }
}


async function addProject(req, res) {
    const body = req.body
    try {
        const newEntry = await prisma.projects.create({
            data: {
                name: body.name,
                company: body.company,
                department: body.department,
                productOwner: body.productOwner,
                description: body.description,
            }
        })
        return res.status(200).json(newEntry, { success: true })
    } catch (error) {
        console.error('Request error', error)
        res.status(500).json({ error: 'Error creating question', success: false })
    }
}