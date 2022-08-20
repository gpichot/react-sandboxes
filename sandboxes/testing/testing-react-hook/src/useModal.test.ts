// renderHook will be moved to @testing-library/react
import { renderHook } from "@testing-library/react-hooks";
import { useModal } from "./useModal";

test("modal is hidden by default", () => {
  const { result } = renderHook(() => useModal());

  expect(result.current.shown).toBe(false);
});
