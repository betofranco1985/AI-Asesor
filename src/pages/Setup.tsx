import { DollarSign, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy}
      className="ml-2 text-slate-400 hover:text-emerald-500 transition-colors">
      {copied ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  );
}

const envContent = `VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

export default function Setup() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center">
            <DollarSign size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">AI Asesor Financiero</h1>
            <p className="text-slate-500 text-sm">Configuración inicial requerida</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex gap-3">
          <span className="text-2xl">⚙️</span>
          <div>
            <p className="font-semibold text-amber-800">Falta la configuración de Supabase</p>
            <p className="text-amber-700 text-sm mt-1">
              La app necesita conectarse a Supabase para guardar los datos de cada usuario.
              Sigue estos 4 pasos para activarla.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">

          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center shrink-0">1</span>
              <p className="font-semibold text-slate-700">Crear cuenta gratis en Supabase</p>
            </div>
            <a href="https://supabase.com" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-emerald-600 font-medium hover:underline">
              Ir a supabase.com <ExternalLink size={14} />
            </a>
            <p className="text-slate-500 text-sm mt-1">
              Regístrate → "New Project" → elige nombre y región → espera que termine de crear.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center shrink-0">2</span>
              <p className="font-semibold text-slate-700">Crear la tabla en la base de datos</p>
            </div>
            <p className="text-slate-500 text-sm">
              En Supabase → <strong>SQL Editor</strong> → <strong>New query</strong> →
              pega el contenido del archivo <code className="bg-slate-100 px-1 rounded text-xs">supabase-setup.sql</code> → clic en <strong>Run</strong>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center shrink-0">3</span>
              <p className="font-semibold text-slate-700">Copiar las claves de tu proyecto</p>
            </div>
            <p className="text-slate-500 text-sm">
              En Supabase → <strong>Project Settings</strong> → <strong>API</strong> → copia:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
              <li><strong>Project URL</strong> → es el <code className="bg-slate-100 px-1 rounded text-xs">VITE_SUPABASE_URL</code></li>
              <li><strong>anon public</strong> → es el <code className="bg-slate-100 px-1 rounded text-xs">VITE_SUPABASE_ANON_KEY</code></li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center shrink-0">4</span>
              <p className="font-semibold text-slate-700">Crear el archivo <code className="bg-slate-100 px-1.5 rounded text-sm">.env.local</code></p>
            </div>
            <p className="text-slate-500 text-sm mb-3">
              En la carpeta raíz del proyecto, crea un archivo llamado <strong>.env.local</strong> con este contenido:
            </p>
            <div className="bg-slate-900 rounded-xl p-4 relative group">
              <pre className="text-emerald-400 text-xs font-mono leading-relaxed whitespace-pre-wrap break-all">
                {envContent}
              </pre>
              <div className="absolute top-3 right-3">
                <CopyButton text={envContent} />
              </div>
            </div>
            <p className="text-slate-400 text-xs mt-2">
              Reemplaza los valores con los que copiaste en el paso 3.
            </p>
          </div>

        </div>

        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl">✅</span>
          <p className="text-emerald-700 text-sm">
            Una vez creado el archivo <strong>.env.local</strong>, detén la app (<strong>Ctrl+C</strong>) y vuelve a ejecutar <strong>npm run dev</strong>. La app se activará con el login.
          </p>
        </div>

      </div>
    </div>
  );
}
