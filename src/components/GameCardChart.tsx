import { ARCADE_BONUSES } from '../content/pricing'

/* Game card load bonuses — mirrors the price chart on the monitors behind customer service. */
export default function GameCardChart({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="border border-white/10 overflow-x-auto" tabIndex={0} role="region" aria-label="Game card bonus chart">
        <table className="w-full text-sm">
          <caption className="sr-only">Game card bonus play by amount loaded</caption>
          <thead>
            <tr className="bg-[#42b23c] text-black font-mono-label text-[10px]">
              <th scope="col" className="text-left px-4 py-3 font-bold">Load</th>
              <th scope="col" className="text-right px-4 py-3 font-bold">Bonus play</th>
              <th scope="col" className="text-right px-4 py-3 font-bold">Total play</th>
            </tr>
          </thead>
          <tbody>
            {ARCADE_BONUSES.map((b) => {
              const total = Number(b.spend.slice(1)) + Number(b.bonus.slice(1))
              return (
                <tr key={b.spend} className="border-t border-white/10">
                  <th scope="row" className="text-left px-4 py-3 font-display text-2xl text-white font-normal">{b.spend}</th>
                  <td className="text-right px-4 py-3 text-[#42b23c] font-semibold">+{b.bonus} free</td>
                  <td className="text-right px-4 py-3 text-white">${total}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-white/60">Game cards are sold and reloaded at the red kiosks. Reloadable — no tokens.</p>
    </div>
  )
}
