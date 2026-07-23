const quotes = [
  { s: 'SPX', v: '6,412.08', c: '+0.84%', up: true },
  { s: 'NDX', v: '23,118.44', c: '+1.21%', up: true },
  { s: 'DJI', v: '44,905.12', c: '+0.42%', up: true },
  { s: 'SPY', v: '639.80', c: '+0.82%', up: true },
  { s: 'QQQ', v: '562.31', c: '+1.18%', up: true },
  { s: 'IWM', v: '228.47', c: '-0.35%', up: false },
  { s: 'AAPL', v: '264.18', c: '+0.61%', up: true },
  { s: 'MSFT', v: '512.44', c: '-0.28%', up: false },
  { s: 'NVDA', v: '227.02', c: '+2.83%', up: true },
  { s: 'VIX', v: '14.20', c: '-5.02%', up: false },
];

export default function TickerTape() {
  const row = [...quotes, ...quotes];
  return (
    <div
      className="overflow-hidden border-y border-white/5 bg-deep/60 py-3"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {row.map((q, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap px-6 text-[13px]">
            <span className="font-bold text-snow">{q.s}</span>
            <span className="tabular-nums text-mist/70">{q.v}</span>
            <span className={`font-semibold tabular-nums ${q.up ? 'text-up' : 'text-down'}`}>
              {q.c}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
