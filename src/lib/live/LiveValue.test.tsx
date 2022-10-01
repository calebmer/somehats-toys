import { LiveValue } from "@/lib/live/LiveValue";
import { beforeEach, expect, test, vi } from "vitest";

const addOne = vi.fn((n: number) => n + 1);
beforeEach(() => {
    vi.restoreAllMocks();
});

test("read value", () => {
    const value = new LiveValue(1);
    expect(value.getWithoutListening()).toBe(1);
});

test("can read written value", () => {
    const value = new LiveValue(1);
    value.update(2);
    value.update(addOne);
    expect(value.getWithoutListening()).toBe(3);
});

test("lazily evaluates updates", () => {
    const value = new LiveValue(1);
    value.update(addOne);
    value.update(addOne);
    value.update(addOne);
    expect(addOne).toBeCalledTimes(0);
    expect(value.getWithoutListening()).toBe(4);
    expect(addOne).toBeCalledTimes(3);
});

test("notifies once of invalidation", () => {
    const value = new LiveValue(1);
    const listener = vi.fn();
    value.addEagerInvalidateListener(listener);

    value.update(addOne);
    expect(listener).toBeCalledTimes(1);
    value.update(addOne);
    expect(listener).toBeCalledTimes(1);

    value.getWithoutListening();
    expect(listener).toBeCalledTimes(1);
    value.update(addOne);
    expect(listener).toBeCalledTimes(2);
    value.update(addOne);
    expect(listener).toBeCalledTimes(2);
});
