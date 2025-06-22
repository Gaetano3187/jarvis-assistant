export async function fetchOffers(products: string[]) {
  const res = await fetch('https://operator.chatgpt.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  });
  if (!res.ok) {
    throw new Error('Operator API request failed');
  }
  return res.json();
}
