/**
 * Test Summary – validateUsername (10 tests)
 * ─────────────────────────────────────────────────────────────────────────
 * Rule: min 5 chars (after trim) + at least 1 uppercase + at least 1 special
 * Pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{5,}$/
 *
 *  #  | Input              | Expected
 * ────|────────────────────|────────────────────────────────────────────────
 *  1  | "Hello!"           | ✓ valid
 *  2  | "Abc!d"            | ✓ valid (exactly 5 chars)
 *  3  | "User1@2026"       | ✓ valid (digits + special)
 *  4  | ""                 | ✗ too short (< 5)
 *  5  | "   "              | ✗ too short after trim
 *  6  | "A!b"              | ✗ too short (3 chars)
 *  7  | "hello!"           | ✗ no uppercase letter
 *  8  | "HelloWorld"       | ✗ no special character
 *  9  | "helloworld"       | ✗ no uppercase + no special (general error)
 * 10  | "  A!b  "          | ✗ trims to 4 chars → too short
 * ─────────────────────────────────────────────────────────────────────────
 */

const { validateUsername } = require("./script");

const VALID_MSG = "Username is valid and matches the required pattern.";
const SHORT_MSG = "Username must be at least 5 characters long.";
const UPPER_MSG = "Username must contain at least 1 uppercase letter.";
const SPECIAL_MSG = "Username must contain at least 1 special character.";
const GENERAL_MSG =
  "Username must be at least 5 characters long and include 1 uppercase letter and 1 special character.";

describe("validateUsername", () => {
  // ── Valid cases ──────────────────────────────────────────────────────────

  test("1. accepts a typical valid username", () => {
    const result = validateUsername("Hello!");
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(VALID_MSG);
  });

  test("2. accepts a username that is exactly 5 characters", () => {
    const result = validateUsername("Abc!d");
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(VALID_MSG);
  });

  test("3. accepts a username with digits and a special character", () => {
    const result = validateUsername("User1@2026");
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(VALID_MSG);
  });

  // ── Too short ────────────────────────────────────────────────────────────

  test("4. rejects an empty string", () => {
    const result = validateUsername("");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(SHORT_MSG);
  });

  test("5. rejects a whitespace-only string (trims to empty)", () => {
    const result = validateUsername("   ");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(SHORT_MSG);
  });

  test("6. rejects a username shorter than 5 characters", () => {
    const result = validateUsername("A!b");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(SHORT_MSG);
  });

  // ── Missing uppercase ────────────────────────────────────────────────────

  test("7. rejects a username with no uppercase letter", () => {
    const result = validateUsername("hello!");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(UPPER_MSG);
  });

  // ── Missing special character ────────────────────────────────────────────

  test("8. rejects a username with no special character", () => {
    const result = validateUsername("HelloWorld");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(SPECIAL_MSG);
  });

  // ── Missing both uppercase and special ───────────────────────────────────

  test("9. rejects a username with no uppercase and no special character", () => {
    const result = validateUsername("helloworld");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(GENERAL_MSG);
  });

  // ── Trim edge case ───────────────────────────────────────────────────────

  test("10. trims surrounding whitespace before checking length", () => {
    const result = validateUsername("  A!b  "); // trims to "A!b" → 3 chars
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(SHORT_MSG);
  });
});
