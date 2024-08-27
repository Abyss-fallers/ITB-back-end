import helmet from 'helmet'

export const configureHelmet = (app) => {
  app.use(helmet())

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000, includeSubDomains: true },
    })
  )
}
