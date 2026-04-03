import { generateCalls } from './mockData';

const calls = generateCalls();

export async function getCalls({ status = '' } = {}) {
  await delay(400);
  return status ? calls.filter((c) => c.status === status) : calls;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
