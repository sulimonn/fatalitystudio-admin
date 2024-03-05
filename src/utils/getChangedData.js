export default function getChangedFields(original, updated) {
  const changedFields = {};
  for (const key in updated) {
    if (original[key] !== updated[key]) {
      changedFields[key] = updated[key];
    }
  }
  return changedFields;
}
