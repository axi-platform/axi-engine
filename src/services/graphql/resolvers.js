export default function Resolvers() {
  const Seating = this.service('seating')

  return {
    Query: {
      async ticket(root, {seat}) {
        const {data} = await Seating.get(seat)

        return data
      },
      async tickets() {
        const {seats} = await Seating.find()

        return seats
      },
    },
    Mutation: {
      async createTicket(root, {seat, buyer}) {
        return Seating.create({seat, buyer})
      },
    },
  }
}
