// What sign-up asks for beyond the login, shared by the form
// (src/app/signup/SignupFlow.tsx) and the server-side check in ./auth.ts so
// the two can't drift. Pure data and helpers — no Convex functions here.

export const ROLES = [
  { id: "vet", label: "Veterinarian" },
  { id: "student", label: "Vet student" },
  { id: "nurse", label: "Veterinary nurse" },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export function roleLabel(id: string | undefined): string {
  return ROLES.find((r) => r.id === id)?.label ?? "";
}

/** English short names (CLDR, via Intl.DisplayNames) of inhabited
 *  countries and territories — stored as the name, not an ISO code, so the
 *  registrations sheet reads without a lookup. */
export const COUNTRIES: readonly string[] = [
  "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa",
  "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia",
  "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda",
  "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil",
  "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Caribbean Netherlands",
  "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
  "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros",
  "Congo - Brazzaville", "Congo - Kinshasa", "Cook Islands", "Costa Rica",
  "Côte d’Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France",
  "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam",
  "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hong Kong SAR China", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy",
  "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Macao SAR China", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
  "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
  "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar (Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea",
  "North Macedonia", "Northern Mariana Islands", "Norway", "Oman", "Pakistan",
  "Palau", "Palestinian Territories", "Panama", "Papua New Guinea", "Paraguay",
  "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal",
  "Puerto Rico", "Qatar", "Réunion", "Romania", "Russia", "Rwanda", "Samoa",
  "San Marino", "São Tomé & Príncipe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "St. Barthélemy", "St. Helena",
  "St. Kitts & Nevis", "St. Lucia", "St. Martin", "St. Pierre & Miquelon",
  "St. Vincent & Grenadines", "Sudan", "Suriname", "Svalbard & Jan Mayen",
  "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad & Tobago",
  "Tunisia", "Türkiye", "Turkmenistan", "Turks & Caicos Islands", "Tuvalu",
  "U.S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Wallis & Futuna", "Western Sahara",
  "Yemen", "Zambia", "Zimbabwe",
];

export type SignupProfile = {
  name: string;
  role: RoleId;
  /** Only for vet students. */
  university?: string;
  country: string;
  /** Optional. */
  phoneNumber?: string;
};

/** Trim, collapse whitespace and cap a free-text field. */
function clean(value: unknown, max = 200): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Loose on purpose — international formats vary too much to do more than
 *  check it's a phone-shaped string of 6–15 digits. */
export function isPhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "").length;
  return /^\+?[\d\s().-]+$/.test(value) && digits >= 6 && digits <= 15;
}

/** Validates the raw sign-up params, or returns the first problem found. */
export function parseSignupProfile(
  params: Record<string, unknown>,
): { ok: true; profile: SignupProfile } | { ok: false; error: string } {
  const name = clean(params.name);
  if (!name) return { ok: false, error: "Missing name" };
  const role = ROLES.find((r) => r.id === params.role)?.id;
  if (!role) return { ok: false, error: "Missing role" };
  const university = clean(params.university);
  if (role === "student" && !university) {
    return { ok: false, error: "Missing university" };
  }
  const country = clean(params.country);
  if (!COUNTRIES.includes(country)) return { ok: false, error: "Missing country" };
  const phoneNumber = clean(params.phoneNumber, 30);
  if (phoneNumber && !isPhoneNumber(phoneNumber)) {
    return { ok: false, error: "Invalid phone number" };
  }
  return {
    ok: true,
    profile: {
      name,
      role,
      ...(role === "student" ? { university } : {}),
      country,
      ...(phoneNumber ? { phoneNumber } : {}),
    },
  };
}
