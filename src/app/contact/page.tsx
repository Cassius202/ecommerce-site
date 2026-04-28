import ContactFormPage from "./ContactFormPage"

const ContactPage = () => {
  return (
    <div className="bg-zinc-950 w-full min-h-svh flex flex-col">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <ContactFormPage />
    </div>
  )
}

export default ContactPage

//draft a simple contact form