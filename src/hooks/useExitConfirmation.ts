import { useBlocker } from "@tanstack/react-router";

/**
 * Blocks in-app navigation with a resolver (proceed/reset) and
 * adds a beforeunload handler for browser close/refresh.
 *
 * Returns the blocker state so the caller can render a custom modal.
 */
export function useExitConfirmation(enabled: boolean) {
  return useBlocker({
    shouldBlockFn: () => enabled,
    enableBeforeUnload: () => enabled,
    withResolver: true,
  });
}
