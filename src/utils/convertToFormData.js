export default function convertToFormData(object) {
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
}
