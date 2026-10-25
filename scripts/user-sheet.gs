// Google Apps Script receiver for convex/userSheet.ts.
//
// Bound to the "Vetic Users" sheet (Extensions → Apps Script). Deployed as a
// web app (Execute as: Me, Who has access: Anyone); its /exec URL is
// USER_SHEET_WEBHOOK_URL on the Convex deployment. "Anyone" is needed because
// Convex calls it without a Google login — SECRET is what keeps others out,
// and must equal USER_SHEET_SECRET. Never commit the real value.
//
// Rows are upserted on the User ID column, so re-sending a user updates their
// row instead of adding another.

const SECRET = "PASTE_USER_SHEET_SECRET_HERE";
const HEADERS = [
  "Signed up", "Name", "Email", "Role", "University", "Country", "Phone",
  "Email verified", "Plan", "User ID",
];

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.secret !== SECRET) return ContentService.createTextOutput("forbidden");

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
    sheet.setFrozenRows(1);

    const idCol = HEADERS.length;
    const last = sheet.getLastRow();
    const ids = last > 1 ? sheet.getRange(2, idCol, last - 1, 1).getValues().map((r) => r[0]) : [];
    const rowOf = new Map(ids.map((id, i) => [id, i + 2]));

    const appended = [];
    for (const r of body.rows) {
      const values = [
        new Date(r.createdAt),
        r.name,
        r.email,
        r.role,
        r.university,
        r.country,
        // A leading "+" would be parsed as a formula; keep phone numbers as text.
        r.phoneNumber ? "'" + r.phoneNumber : "",
        r.emailVerified ? "Yes" : "No",
        r.plan,
        r.userId,
      ];
      const at = rowOf.get(r.userId);
      if (at) sheet.getRange(at, 1, 1, values.length).setValues([values]);
      else appended.push(values);
    }
    if (appended.length) {
      appended.sort((a, b) => a[0] - b[0]);
      sheet.getRange(sheet.getLastRow() + 1, 1, appended.length, HEADERS.length).setValues(appended);
    }
    sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).setNumberFormat("yyyy-mm-dd hh:mm");
    return ContentService.createTextOutput("ok " + body.rows.length);
  } finally {
    lock.releaseLock();
  }
}
