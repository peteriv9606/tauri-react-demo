import { window as tauriWindow } from '@tauri-apps/api';
import { EventCallback, UnlistenFn } from '@tauri-apps/api/event';
import { useEffect, useRef } from 'react';

type HookState = 'none' | 'initializing' | 'initialized' | 'removing';

const useWindowEventListener = (event: string, callback: EventCallback<unknown>) => {
  const hookRef = useRef<{ unlistener?: UnlistenFn; state: HookState }>({
    unlistener: undefined,
    state: 'none',
  });

  useEffect(() => {
    const initHook = async () => {
      if (['none', 'removing'].includes(hookRef.current.state)) {
        console.log(`initializing event listener "${event}"..`);
        hookRef.current.state = 'initializing';

        tauriWindow
          .getCurrentWindow()
          .listen(event, callback)
          .then((unlistenerFn) => {
            console.log(`event listener "${event}" initialized`);
            hookRef.current.state = 'initialized';
            hookRef.current.unlistener = unlistenerFn;
          });
      }
    };

    initHook();

    return () => {
      if (hookRef.current.state === 'initialized' && hookRef.current?.unlistener) {
        console.log(`removing event listener "${event}"..`);
        hookRef.current.state = 'removing';
        hookRef.current?.unlistener();
        hookRef.current.state = 'none';
        console.log(`event listener "${event}" removed`);
      }
    };
  }, []);
};

export { useWindowEventListener };
