import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "../use-counter";


describe('useCounter', () => {
  it('should be able increment and reset counter', () => {
    const { result } = renderHook(() => useCounter({ initial: 0 }))


    act(() => result.current.increment())
    expect(result.current.count).toBe(1)

    act(() => result.current.reset())
    expect(result.current.count).toBe(0)
  })
})
