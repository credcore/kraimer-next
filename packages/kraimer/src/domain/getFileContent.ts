import { getDb } from "../db/index.js";

export async function getFileContent(documentId: number): Promise<Buffer> {
  const db = await getDb();
  const documentResult = await db.oneOrNone(
    `
      SELECT file_content_id
      FROM document
      WHERE id = $<documentId>
    `,
    { documentId }
  );

  if (!documentResult) {
    throw new Error(`No document found with id: ${documentId}`);
  }

  const fileContentResult = await db.oneOrNone(
    `
      SELECT content
      FROM file_content
      WHERE id = $<fileContentId>
    `,
    { fileContentId: documentResult.file_content_id }
  );

  if (!fileContentResult) {
    throw new Error(`No file content found with id: ${documentResult.file_content_id}`);
  }

  return fileContentResult.content;
}
