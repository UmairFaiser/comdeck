export const metadata = {
  title: "Contact | Comdeck",
};

import ContactPageClient from "../../components/ContactPageClient";

export default function ContactPage() {

  return (
    <section className="py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">Contact</h1>
        <p className="mt-2 text-center text-text-secondary">
          Reach us via the numbers below. Replace with official numbers when
          available.
        </p>
      </header>

      <ContactPageClient />
    </section>
  );
}