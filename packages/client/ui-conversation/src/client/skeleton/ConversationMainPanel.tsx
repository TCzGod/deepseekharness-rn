import type { ConversationSlotProps } from '../contract/slots.ts'
import { conversationPhase } from '../contract/snapshot.ts'
import { ConversationWidthControls } from './ConversationWidthControls.tsx'
import css from './ConversationRoot.module.css'

const CONTENT_SLOTS = { widthControls: ConversationWidthControls }

/**
 * Render the existing main Conversation frame around the extracted content.
 * @param props - the original `main.conversation` Slot props.
 * @returns the branded root, Header, content, and width-control subtree.
 */
export function ConversationMainPanel(props: ConversationSlotProps) {
  const { sessionId, useSession, useSessions, useConversation, renderSlot, renderFactorySlot } = props
  const session = useSession(s => s)
  const conversation = useConversation(s => s)
  const shellPhase = session === undefined || conversation === undefined
    ? 'blank'
    : conversationPhase(session, conversation)
  const openState = session?.openState
  const summaryBlank = useSessions(s => sessionId === undefined ? undefined : s.byId[sessionId]?.blank)

  // While a session is still replaying (loading + blank) the hero/docked
  // choice is unknowable — render the composer hidden instead of flashing
  // the centered hero and snapping to the docked bar (or vice versa).
  // Exemption: a session the list summary already proves blank can only
  // land on the hero, so hiding would blank the column for the whole
  // history round-trip (the startup auto-selection flash) for nothing.
  // The exemption is deliberately open-state-wide, not loading-only: a
  // summary-blank session is the hero before its open starts (`cold`) and
  // after one fails (`error`) for the same reason — there is no history.
  // A restored continuable subagent waits for a Host summary to establish
  // parent availability. This keeps the composer
  // hidden instead of briefly rendering the parent-offline takeover.
  const parentAvailabilityPending = session?.subagent?.address.mode === 'continuable'
    && session.subagent.parentAvailable === undefined
  const settling = sessionId !== undefined && (
    (shellPhase === 'blank' && openState === 'loading' && summaryBlank !== true)
    || parentAvailabilityPending
  )
  const hero = sessionId === undefined
    || (shellPhase === 'blank' && (openState === 'open' || summaryBlank === true))
  const phase = settling ? 'settling' : hero ? 'hero' : 'active'

  return (
    <div className={css.root} data-phase={phase}>
      {/* Single large centered RNTEC logo as fixed-position background
          watermark. position:fixed keeps it pinned to the viewport center
          regardless of scroll; z-index sits between the page bg and all
          interactive content so it never scrolls with the transcript. */}
      <div className={css.bgLogo} aria-hidden="true">
        <img src="/rntec-logo.png" alt="" draggable={false} />
      </div>
      {/* Ruineng BMS hero backdrop: looping video + scrim + blueprint grid,
          mounted only in the blank/hero phase so video decoding stops the
          moment a chat starts. Positioned absolutely over the whole column
          root; the header, transcript, and composer all paint above it. */}
      {hero && (
        <div className={css.heroBackdrop} aria-hidden="true">
          <video className={css.heroVideo} autoPlay loop muted playsInline preload="auto">
            <source src="/bms-bg.mp4" type="video/mp4" />
          </video>
          <div className={css.heroScrim} />
          <div className={css.heroGrid} />
        </div>
      )}
      {renderSlot('conversation.header', {})}
      {renderFactorySlot('conversation.content', {
        variant: 'main',
        phase,
        hero,
      }, {
        slots: CONTENT_SLOTS,
      })}
    </div>
  )
}
