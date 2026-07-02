import { useRef, useCallback } from 'react';
import { useNavVisibility } from '../navVisibility';

// Headers/nav bars in this app animate `max-height` / `padding` (layout
// properties) when they collapse. That resizes the sibling scrollable
// container's clientHeight mid-transition, which can make the browser
// auto-clamp `scrollTop` to the new (smaller) max scroll distance.
// That clamp fires its own native 'scroll' event -> we'd read currentY
// as "near the top" -> flip `visible` back to true -> header expands
// again -> clamp fires again -> repeat. This constant is how long we
// ignore scroll-driven visibility changes after we trigger one, so that
// transition-induced scroll events never get misread as user input.
// Should be >= the CSS transition duration used by the headers/nav (300ms).
const TRANSITION_GUARD_MS = 350;

/**
 * Tracks scroll direction on a scrollable container and pushes a
 * `visible` boolean into the shared NavVisibilityContext, used to
 * control header/bottom-nav slide-in/slide-out behavior.
 *
 * - Scrolling down past a small threshold -> visible = false
 * - Scrolling up (even slightly) -> visible = true
 * - Near the top of the container -> always visible = true
 *
 * Usage inside a screen:
 *   const { onScroll, visible } = useScrollDirection();
 *   <div onScroll={onScroll} className="overflow-y-auto">...</div>
 *   <Header className={visible ? '' : '-translate-y-full opacity-0'} />
 */
export function useScrollDirection(threshold = 8) {
  const { visible, setVisible } = useNavVisibility();
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);
  const guardedUntil = useRef(0);

  const changeVisible = useCallback((next: boolean) => {
    setVisible(next);
    accumulatedDelta.current = 0;
    // Ignore scroll events for a bit while the header/nav CSS transition
    // plays out and reflows the scroll container.
    guardedUntil.current = Date.now() + TRANSITION_GUARD_MS;
  }, [setVisible]);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const currentY = e.currentTarget.scrollTop;

    if (Date.now() < guardedUntil.current) {
      // Still resync the reference point so that once the guard lifts we
      // compute a fresh delta instead of one huge jump caused by the
      // transition-driven layout shift.
      lastScrollY.current = currentY;
      return;
    }

    const delta = currentY - lastScrollY.current;

    // Always show near the top
    if (currentY < 24) {
      if (!visible) changeVisible(true);
      accumulatedDelta.current = 0;
      lastScrollY.current = currentY;
      return;
    }

    // Same direction as before -> accumulate, otherwise reset
    if ((delta > 0 && accumulatedDelta.current >= 0) || (delta < 0 && accumulatedDelta.current <= 0)) {
      accumulatedDelta.current += delta;
    } else {
      accumulatedDelta.current = delta;
    }

    if (accumulatedDelta.current > threshold && visible) {
      changeVisible(false);
    } else if (accumulatedDelta.current < -threshold && !visible) {
      changeVisible(true);
    }

    lastScrollY.current = currentY;
  }, [threshold, visible, changeVisible]);

  return { visible, onScroll };
}
