import cors from 'cors'

export default defineNitroPlugin((plugin) => {
  plugin.h3App.use(
    fromNodeMiddleware(
      cors({
        origin: ['https://nu-be-au-exc.vercel.app', 'http://localhost:3000', 'https://nu-be-au-gpthp1tz6-sascha-dietrichs-projects.vercel.app'],
      }),
    ),
  )
})
