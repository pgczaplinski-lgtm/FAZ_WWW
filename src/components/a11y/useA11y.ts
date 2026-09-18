import { useCallback, useEffect, useState } from "react";

/** Accessibility toolbar state, persisted to localStorage and reflected as
 * classes on <html> (styled in index.css). */
export interface A11yState {
  contrast: boolean;
  fontStep: 0 | 1 | 2;
  underline: boolean;
}

const STORAGE_KEY = "faz-a11y";

const initial: A11yState = { contrast: false, fontStep: 0, underline: false };

function read(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...initial, ...(JSON.parse(raw) as Partial<A11yState>) };
  } catch {
    /* ignore */
  }
  return initial;
}

function apply(state: A11yState) {
  const el = document.documentElement;
  el.classList.toggle("a11y-contrast", state.contrast);
  el.classList.toggle("a11y-fs-1", state.fontStep === 1);
  el.classList.toggle("a11y-fs-2", state.fontStep === 2);
  el.classList.toggle("a11y-underline", state.underline);
}

export function useA11y() {
  const [state, setState] = useState<A11yState>(read);

  useEffect(() => {
    apply(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const toggleContrast = useCallback(
    () => setState((s) => ({ ...s, contrast: !s.contrast })),
    [],
  );
  const increaseFont = useCallback(
    () => setState((s) => ({ ...s, fontStep: Math.min(2, s.fontStep + 1) as 0 | 1 | 2 })),
    [],
  );
  const decreaseFont = useCallback(
    () => setState((s) => ({ ...s, fontStep: Math.max(0, s.fontStep - 1) as 0 | 1 | 2 })),
    [],
  );
  const toggleUnderline = useCallback(
    () => setState((s) => ({ ...s, underline: !s.underline })),
    [],
  );
  const reset = useCallback(() => setState(initial), []);

  return { state, toggleContrast, increaseFont, decreaseFont, toggleUnderline, reset };
}
