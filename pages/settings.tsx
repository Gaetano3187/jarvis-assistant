import Head from "next/head";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Impostazioni • Jarvis Assistant</title>
      </Head>

      <main className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Impostazioni</h1>

        <section className="space-y-4">
          <div className="border p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Profilo utente</h2>
            <p className="text-sm text-gray-600">In arrivo…</p>
          </div>

          <div className="border p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Preferenze</h2>
            <p className="text-sm text-gray-600">In arrivo…</p>
          </div>
        </section>
      </main>
    </>
  );
}