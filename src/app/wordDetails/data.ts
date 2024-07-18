export async function getData() {
  const res = await fetch("http://localhost:3000/wordDetails/api");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
