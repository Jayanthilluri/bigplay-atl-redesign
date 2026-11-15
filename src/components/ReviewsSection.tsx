import EmbedFrame from './EmbedFrame'

/* Real customer reviews via the LeadConnector (GoHighLevel) Reputation widget.
   Colors, fonts and which reviews show are set in GoHighLevel:
   Reputation → Widgets → this widget → Customize. */
const REVIEWS_WIDGET_SRC =
  'https://reputationhub.site/reputation/widgets/review_widget/6oWVUr5GVo8EzTzJCIl0'
const REVIEWS_WIDGET_SCRIPT = 'https://reputationhub.site/reputation/assets/review-widget.js'

export default function ReviewsSection({
  eyebrow = 'Reviews',
  title = 'What guests are saying',
  className = '',
}: {
  eyebrow?: string
  title?: string
  className?: string
}) {
  return (
    <section className={`px-5 sm:px-8 py-16 md:py-24 border-t border-white/10 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal font-mono-label text-[12px] text-[#ff8e4d]">{eyebrow}</p>
        <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
          {title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-[#42b23c]">{title.split(' ').slice(-1)}</span>
        </h2>
        <div className="mt-10">
          <EmbedFrame
            src={REVIEWS_WIDGET_SRC}
            title="Big Play ATL customer reviews"
            className="lc_reviews_widget min-w-full min-h-[360px]"
            background="bg-transparent"
            script={REVIEWS_WIDGET_SCRIPT}
            attrs={{ scrolling: 'no', frameBorder: '0' }}
          />
        </div>
      </div>
    </section>
  )
}
