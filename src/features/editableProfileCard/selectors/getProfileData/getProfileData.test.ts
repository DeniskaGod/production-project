import { Currency } from "@/entities/Currency";
import { getProfileData } from "./getProfileData";
import { Country } from "@/entities/Country";
import { StateSchema } from "@/app/providers/StoreProvider";

// ✅ Создаем свой тип DeepPartial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

describe("getProfileData.test", () => {
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
        data,
        readonly: false,
        isLoading: false,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
