import Card from '@/components/Card';

export default function AboutPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <span className="bg-sky-500/10 text-sky-400 text-xs font-bold px-3 py-1 rounded-full border border-sky-500/20 uppercase">Project Proposal</span>
        <h2 className="text-4xl font-black font-syne mt-2">About Boarder-Q</h2>
        <div className="h-1 w-20 bg-sky-500 mt-4"></div>
      </header>

      <div className="space-y-8">
        <Card title="Abstract" icon="📄" colorClass="border-sky-500">
          <p className="text-slate-400 leading-relaxed mb-4">
            Boarder-Q is a platform-based boarding house management system designed to improve rental administration and tenant engagement.
          </p>
          <div className="bg-sky-500/5 border-l-4 border-sky-500 p-4 font-mono text-xs text-sky-300">
            Tech Stack: Next.js · Node.js · Expo · MySQL · Vercel
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Core Modules" icon="🎯" colorClass="border-green-500">
            <ul className="text-sm text-slate-400 space-y-2 list-disc ml-4">
              <li>Room Availability & Onboarding</li>
              <li>Rent Payment Tracking</li>
              <li>Maintenance & Repair Requests</li>
            </ul>
          </Card>
          <Card title="Proponents" icon="👩‍💻" colorClass="border-purple-500">
            <p className="text-sm text-slate-300 font-bold">Abal, Che Ann P.</p>
            <p className="text-sm text-slate-300 font-bold">Lagpac, Sheila Mae A.</p>
            <p className="text-sm text-slate-300 font-bold">Orosca, Xhyndy Lynne A.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}