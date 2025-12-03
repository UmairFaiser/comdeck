export const metadata = {
  title: "Contact | Comdeck",
};

import ContactPageClient from "../../components/ContactPageClient";

export default function ContactPage() {

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center">Contact</h1>
          <p className="mt-2 text-center text-text-secondary">
            Reach us via whatsapp through the numbers below if you need to submit a resource, a feature request, a complaint or any other inquiries regarding the website.
          </p>
        </header>

        <ContactPageClient />
      </div>
    </section>
  );
}