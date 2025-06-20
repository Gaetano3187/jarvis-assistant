import VoiceInput from '../../components/VoiceInput
import ReceiptUploader from '@/co../../components/ReceiptUploader

export default function FinanzePage() {
  const handleVoice = (txt: string) => {
    // TODO: regex per "aggiungi spesa casa 50 euro" ecc.
    console.log('Comando vocale:', txt);
  };

  return (
    <section className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spese Casa</h1>
        <VoiceInput onResult={handleVoice} />
      </header>

      {/* BudgetCard + grafici (da implementare) */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Nuovo Scontrino</h2>
            <ReceiptUploader />
          </div>
        </div>

        {/* ExpensesTable (da implementare) */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Ultime Spese</h2>
            {/* <ExpensesTable category="Casa" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
