import { describe, expect, test } from "vitest";
import { parseSignupProfile } from "./signupProfile";

const base = { name: "  Ana   Vet ", role: "vet", country: "Ireland" };

describe("parseSignupProfile", () => {
  test("a vet needs no university, and phone is optional", () => {
    expect(parseSignupProfile(base)).toEqual({
      ok: true,
      profile: { name: "Ana Vet", role: "vet", country: "Ireland" },
    });
  });

  test("a vet student must give a university", () => {
    expect(parseSignupProfile({ ...base, role: "student" })).toMatchObject({ ok: false });
    expect(
      parseSignupProfile({ ...base, role: "student", university: "UCD" }),
    ).toMatchObject({ ok: true, profile: { university: "UCD" } });
  });

  test("a university sent for a non-student is dropped", () => {
    const r = parseSignupProfile({ ...base, role: "nurse", university: "UCD" });
    expect(r.ok && r.profile.university).toBeFalsy();
  });

  test("rejects an unknown role or country", () => {
    expect(parseSignupProfile({ ...base, role: "admin" })).toMatchObject({ ok: false });
    expect(parseSignupProfile({ ...base, country: "Atlantis" })).toMatchObject({ ok: false });
  });

  test("checks the phone number only when given", () => {
    expect(parseSignupProfile({ ...base, phoneNumber: "+353 87 123 4567" })).toMatchObject({
      ok: true,
      profile: { phoneNumber: "+353 87 123 4567" },
    });
    expect(parseSignupProfile({ ...base, phoneNumber: "call me" })).toMatchObject({ ok: false });
  });
});
