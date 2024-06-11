import { getDb } from "../db/index.js";
import { Extraction } from "./Extraction.js";
import { getExtraction } from "./getExtraction.js";
import { TaskStatusEnum } from "./TaskStatusEnum.js";

export async function createExtraction(
  documentGroupId: number,
  name: string,
  status: TaskStatusEnum
): Promise<Extraction> {
  const db = getDb();
  const result = await db.one(
    `
      INSERT INTO extraction (document_group_id, name, status)
      VALUES ($<documentGroupId>, $<name>, $<status>)
      RETURNING id
    `,
    { documentGroupId, name, status }
  );
  return getExtraction(result.id);
}
