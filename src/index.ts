import AdminJSExpress from '@adminjs/express'
import * as AdminJSPrisma from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import { DMMFClass } from '@prisma/client/runtime'
import AdminJS from 'adminjs'
import express from 'express'

const prisma = new PrismaClient()

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database
})

const PORT = 3000

const start = async () => {
  const app = express()

  const dmmf = (prisma as any)._baseDmmf as DMMFClass
  const adminOptions = {
    // We pass Publisher to `resources`
    resources: [
      {
        resource: { model: dmmf.modelMap.Project, client: prisma },
        options: {}
      },
      {
        resource: { model: dmmf.modelMap.Challenge, client: prisma },
        options: {}
      },
      {
        resource: { model: dmmf.modelMap.ChallengeStack, client: prisma },
        options: {}
      },
      {
        resource: { model: dmmf.modelMap.ProjectStack, client: prisma },
        options: {}
      },
      {
        resource: { model: dmmf.modelMap.Tech, client: prisma },
        options: {}
      }
    ]
  }

  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    )
  })
}

start()
