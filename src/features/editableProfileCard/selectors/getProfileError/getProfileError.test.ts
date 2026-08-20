import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileError } from "./getProfileError";
import { DeepPartial } from "@/shared/lib/tests/deepPartial";

describe("getProfileError.test", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: "123",
        isLoading: false,
        readonly: false,
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual("123");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
