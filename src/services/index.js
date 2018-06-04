import seating from './seating'
import graphql from './graphql'

export default async function(app) {
  app.configure(seating)
  app.configure(graphql)
}
