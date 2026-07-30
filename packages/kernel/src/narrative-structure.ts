import { canonicalJson, contentSha256 } from "@storyworld/domain";
import { ValidationError } from "./actors.js";

/**
 * Server-side contract validation for narrative-structure documents
 * (DEC-0020; SWUX-007). The kernel refuses to store a document that does
 * not conform to storyworld.narrative-structure.v1, so a client can never
 * silently discard choices, branches, bindings, or per-unit fields by
 * reconstructing a reduced document. Checks mirror
 * packages/contracts/schemas/narrative-structure.schema.json, including
 * additionalProperties: false at every level and the embedded
 * content_sha256 integrity convention (hash of the document without its
 * content_sha256 field, as canon releases already do).
 */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SHA256_RE = /^[a-f0-9]{64}$/;
const CREATED_AT_RE = /^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?Z)?$/;
const TEMPORAL_MARKERS = ["linear", "flashback", "flash_forward", "replay_alternate_perspective"];
const THREAD_TYPES = ["promise", "reveal", "mystery", "mission", "dependency"];

type Doc = Record<string, unknown>;

function fail(path: string, message: string): never {
  throw new ValidationError(`narrative-structure ${path}: ${message}`);
}

function asObject(value: unknown, path: string): Doc {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(path, "must be an object");
  }
  return value as Doc;
}

function checkKeys(obj: Doc, path: string, required: string[], optional: string[] = []): void {
  for (const key of required) {
    if (!(key in obj)) fail(path, `missing required field "${key}"`);
  }
  const allowed = new Set([...required, ...optional]);
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) fail(path, `unknown field "${key}" (additionalProperties: false)`);
  }
}

function checkString(value: unknown, path: string, opts: { nullable?: boolean; re?: RegExp; enumOf?: string[] } = {}): void {
  if (value === null) {
    if (opts.nullable) return;
    fail(path, "must be a string, not null");
  }
  if (typeof value !== "string" || value.length === 0) fail(path, "must be a non-empty string");
  if (opts.re && !opts.re.test(value)) fail(path, `does not match required pattern ${opts.re}`);
  if (opts.enumOf && !opts.enumOf.includes(value)) fail(path, `must be one of ${opts.enumOf.join(", ")}`);
}

function checkArray(value: unknown, path: string, minItems = 0): unknown[] {
  if (!Array.isArray(value)) fail(path, "must be an array");
  if (value.length < minItems) fail(path, `must contain at least ${minItems} item(s)`);
  return value;
}

function checkUnit(value: unknown, path: string): void {
  const unit = asObject(value, path);
  checkKeys(
    unit, path,
    ["unit_id", "unit_type", "display_number", "presentation_order", "story_time", "publication_time", "parent_unit_ref"],
    ["revision_of_ref", "pov_entity_ref", "temporal_marker"],
  );
  checkString(unit["unit_id"], `${path}.unit_id`, { re: UUID_RE });
  checkString(unit["unit_type"], `${path}.unit_type`);
  if (unit["display_number"] !== null && typeof unit["display_number"] !== "string") {
    fail(`${path}.display_number`, "must be a string or null");
  }
  if (!Number.isInteger(unit["presentation_order"])) fail(`${path}.presentation_order`, "must be an integer");
  checkString(unit["story_time"], `${path}.story_time`);
  if (unit["publication_time"] !== null && typeof unit["publication_time"] !== "string") {
    fail(`${path}.publication_time`, "must be a string or null");
  }
  checkString(unit["parent_unit_ref"], `${path}.parent_unit_ref`, { nullable: true });
  if ("revision_of_ref" in unit) checkString(unit["revision_of_ref"], `${path}.revision_of_ref`, { nullable: true });
  if ("pov_entity_ref" in unit) checkString(unit["pov_entity_ref"], `${path}.pov_entity_ref`, { nullable: true });
  if ("temporal_marker" in unit) checkString(unit["temporal_marker"], `${path}.temporal_marker`, { enumOf: TEMPORAL_MARKERS });
}

function checkChoice(value: unknown, path: string): void {
  const choice = asObject(value, path);
  checkKeys(choice, path, ["choice_id", "at_unit_ref", "prompt", "options"]);
  checkString(choice["choice_id"], `${path}.choice_id`, { re: UUID_RE });
  checkString(choice["at_unit_ref"], `${path}.at_unit_ref`);
  checkString(choice["prompt"], `${path}.prompt`);
  const options = checkArray(choice["options"], `${path}.options`, 2);
  options.forEach((optionValue, index) => {
    const optionPath = `${path}.options[${index}]`;
    const option = asObject(optionValue, optionPath);
    checkKeys(option, optionPath, ["option_id", "label", "prerequisites", "effects", "leads_to_unit_ref", "branch_label"]);
    checkString(option["option_id"], `${optionPath}.option_id`);
    checkString(option["label"], `${optionPath}.label`);
    checkArray(option["prerequisites"], `${optionPath}.prerequisites`).forEach((p, i) =>
      checkString(p, `${optionPath}.prerequisites[${i}]`),
    );
    checkArray(option["effects"], `${optionPath}.effects`).forEach((effectValue, i) => {
      const effectPath = `${optionPath}.effects[${i}]`;
      const effect = asObject(effectValue, effectPath);
      checkKeys(effect, effectPath, ["entity_ref", "attribute", "to_value"]);
      checkString(effect["entity_ref"], `${effectPath}.entity_ref`);
      checkString(effect["attribute"], `${effectPath}.attribute`);
    });
    checkString(option["leads_to_unit_ref"], `${optionPath}.leads_to_unit_ref`);
    checkString(option["branch_label"], `${optionPath}.branch_label`);
  });
}

function checkBranch(value: unknown, path: string): void {
  const branch = asObject(value, path);
  checkKeys(branch, path, ["branch_label", "reconverges_at_unit_ref", "mutually_exclusive_with"]);
  checkString(branch["branch_label"], `${path}.branch_label`);
  checkString(branch["reconverges_at_unit_ref"], `${path}.reconverges_at_unit_ref`, { nullable: true });
  checkArray(branch["mutually_exclusive_with"], `${path}.mutually_exclusive_with`).forEach((m, i) =>
    checkString(m, `${path}.mutually_exclusive_with[${i}]`),
  );
}

function checkThread(value: unknown, path: string): void {
  const thread = asObject(value, path);
  checkKeys(thread, path, [
    "thread_id", "thread_type", "introduced_in_unit_ref", "resolved_in_unit_ref",
    "earliest_permitted_unit_ref", "depends_on_thread_refs",
  ]);
  checkString(thread["thread_id"], `${path}.thread_id`, { re: UUID_RE });
  checkString(thread["thread_type"], `${path}.thread_type`, { enumOf: THREAD_TYPES });
  checkString(thread["introduced_in_unit_ref"], `${path}.introduced_in_unit_ref`);
  checkString(thread["resolved_in_unit_ref"], `${path}.resolved_in_unit_ref`, { nullable: true });
  checkString(thread["earliest_permitted_unit_ref"], `${path}.earliest_permitted_unit_ref`, { nullable: true });
  checkArray(thread["depends_on_thread_refs"], `${path}.depends_on_thread_refs`).forEach((d, i) =>
    checkString(d, `${path}.depends_on_thread_refs[${i}]`),
  );
}

/** Throws ValidationError unless the document conforms to the contract. */
export function validateNarrativeStructureDocument(document: Doc): void {
  checkKeys(document, "document", [
    "schema_version", "structure_id", "property_id", "canon_release_ref", "production_ref",
    "narrative_units", "choices", "branches", "threads", "created_at", "content_sha256",
  ]);
  if (document["schema_version"] !== "storyworld.narrative-structure.v1") {
    fail("document.schema_version", 'must be "storyworld.narrative-structure.v1"');
  }
  checkString(document["structure_id"], "document.structure_id", { re: UUID_RE });
  checkString(document["property_id"], "document.property_id", { re: UUID_RE });
  checkString(document["canon_release_ref"], "document.canon_release_ref");
  checkString(document["production_ref"], "document.production_ref", { nullable: true });
  checkArray(document["narrative_units"], "document.narrative_units", 1).forEach((u, i) =>
    checkUnit(u, `document.narrative_units[${i}]`),
  );
  checkArray(document["choices"], "document.choices").forEach((c, i) => checkChoice(c, `document.choices[${i}]`));
  checkArray(document["branches"], "document.branches").forEach((b, i) => checkBranch(b, `document.branches[${i}]`));
  checkArray(document["threads"], "document.threads").forEach((t, i) => checkThread(t, `document.threads[${i}]`));
  checkString(document["created_at"], "document.created_at", { re: CREATED_AT_RE });
  checkString(document["content_sha256"], "document.content_sha256", { re: SHA256_RE });
  const { content_sha256: embedded, ...unsigned } = document;
  const expected = contentSha256(canonicalJson(unsigned));
  if (embedded !== expected) {
    fail("document.content_sha256", `embedded hash does not match the document content (expected ${expected})`);
  }
}

/** Stamp created_at (when absent) and the embedded content hash, then validate. */
export function sealNarrativeStructureDocument(unsigned: Doc): Doc {
  const { content_sha256: _discarded, ...rest } = unsigned;
  const stamped: Doc = {
    ...rest,
    created_at: rest["created_at"] ?? new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };
  const sealed: Doc = { ...stamped, content_sha256: contentSha256(canonicalJson(stamped)) };
  validateNarrativeStructureDocument(sealed);
  return sealed;
}
