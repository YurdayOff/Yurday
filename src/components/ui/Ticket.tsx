import './Ticket.css'

/** Encoches latérales : la carte prend l'allure d'un ticket. */
export function TicketNotches() {
  return (
    <>
      <span className="notch left" aria-hidden="true" />
      <span className="notch right" aria-hidden="true" />
    </>
  )
}

/** Pointillés de détachement, entre l'en-tête et le corps d'un ticket. */
export function Perforation() {
  return <div className="perforation" aria-hidden="true" />
}
