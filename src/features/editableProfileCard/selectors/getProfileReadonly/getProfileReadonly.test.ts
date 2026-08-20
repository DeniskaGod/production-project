import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileReadonly } from "./getProfileReadonly";
import { DeepPartial } from "@/shared/lib/tests/deepPartial";

describe("getProfileReadonly.test", () => {
  test("should work with filled state", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
        isLoading: false,
      },
    };
    expect(getProfileReadonly(state as StateSchema)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
  });
});
