export async function getData(id: any) {
  const res = await fetch(`http://localhost:3000/words/${id}/api`);
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  return res.json();
}
