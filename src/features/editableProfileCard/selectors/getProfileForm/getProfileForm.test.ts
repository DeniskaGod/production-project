import { Currency } from "@/entities/Currency";
import { getProfileForm } from "./getProfileForm";
import { Country } from "@/entities/Country";
import { StateSchema } from "@/app/providers/StoreProvider";
import { DeepPartial } from "@/shared/lib/tests/deepPartial";

describe("getProfileForm.test", () => {
  test("should return error", () => {
    const data = {
      first: "Denis",
      lastname: "Denisov",
      age: 20,
      currency: Currency.LEI,
      country: Country.Moldova,
      city: "Chisinau",
      username: "admin",
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
        readonly: false,
        isLoading: false,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
