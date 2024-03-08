export function setTitle(newTitle) {
  if (!newTitle) return (document.title = 'FatalityStudio Admin');
  document.title = 'FatalityStudio | ' + newTitle;
}
