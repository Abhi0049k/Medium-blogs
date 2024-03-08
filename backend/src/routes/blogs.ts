import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "mangalam-kumar-medium-blogs";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        authorId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    try {

        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set('authorId', user.id);
            await next();
        } else {
            return c.json({ message: "You are not logged in" })
        }
    } catch (err) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})

blogRouter.get('/all', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json(blogs)
    } catch (err) {
        c.status(500);
        return c.json({ message: "Something went wrong!" });
    }
})

blogRouter.get('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const blog = await prisma.blog.findFirst({ where: { id: Number(id) } })
        return c.json({ blog })
    } catch (err) {
        c.status(500);
        return c.json({ message: "Something went wrong!" });
    }
})

blogRouter.post('/', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const authorId = c.get("authorId");
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            c.status(403);
            return c.json({
                message: "Invalid type"
            })
        }
        console.log("reaching here after success");
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                description: body.description,
                authorId: Number(authorId)
            }
        })
        return c.json({ id: blog.id });
    }
    catch (err) {
        console.log(err);
        c.status(500);
        return c.json({ message: "Something went wrong!" });
    }
})

blogRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(403);
        return c.json({
            message: "Invalid Type"
        })
    }
    const blog = await prisma.blog.update({
        where: {
            id: Number(id)
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({ id: blog.id });
})
