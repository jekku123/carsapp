export function insertRows(obj, table) {
  const row = table.insertRow(-1);
  Object.values(obj).forEach((value, i) => (row.insertCell(i).textContent = value));
}
