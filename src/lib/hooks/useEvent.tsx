import { useCallback, useDebugValue, useLayoutEffect, useRef } from "react";
import { assert } from "@/lib/assert";

export function useEvent<Args extends Array<unknown>, Result>(
    handler: (...args: Args) => Result,
): (...args: Args) => Result {
    const handlerRef = useRef<(...args: Args) => Result>();

    // In a real implementation, this would run before layout effects
    useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    useDebugValue(handler);

    return useCallback((...args: Args) => {
        // In a real implementation, this would throw if called during render
        const fn = handlerRef.current;
        assert(fn, "fn does not exist");
        return fn(...args);
    }, []);
}
