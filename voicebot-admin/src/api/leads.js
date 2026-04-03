import { generateLeads } from './mockData';

let leads = generateLeads();

export async function getLeads() {
  await delay(400);
  const active = leads.filter(
    (l) => l.status === 'Not called' || l.status === 'No answer'
  );

  const notCalled = active.filter((l) => l.status === 'Not called');
  const noAnswer = active
    .filter((l) => l.status === 'No answer')
    .sort((a, b) => a.priority - b.priority);

  return [...notCalled, ...noAnswer];
}

export async function importLeads(csvRows) {
  await delay(700);
  const newLeads = csvRows
    .filter((row) => row.name && row.phone)
    .map((row, i) => ({
      id: Date.now() + i,
      name: row.name,
      phone: row.phone,
      info: row.info || '',
      status: 'Not called',
      priority: 99,
    }));

  const existingPhones = new Set(leads.map((l) => l.phone));
  const deduped = newLeads.filter((l) => !existingPhones.has(l.phone));
  leads = [...leads, ...deduped];

  return { imported: deduped.length, skipped: newLeads.length - deduped.length };
}

export async function startCallingQueue() {
  await delay(500);
  return { started: true, queued: leads.filter((l) => l.status === 'Not called').length };
}

export async function stopCallingQueue() {
  await delay(400);
  return { stopped: true };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
