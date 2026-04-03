const firstNames = ['Anna', 'Marek', 'Katarzyna', 'Piotr', 'Joanna', 'Tomasz', 'Maria', 'Krzysztof', 'Agnieszka', 'Michał', 'Barbara', 'Łukasz', 'Monika', 'Paweł', 'Ewa', 'Rafał', 'Dorota', 'Grzegorz', 'Magdalena', 'Adam'];
const lastNames = ['Kowalski', 'Nowak', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński', 'Szymański', 'Woźniak', 'Kozłowski', 'Jankowski', 'Mazur', 'Wojciechowski', 'Kwiatkowski', 'Krawczyk', 'Piotrowska', 'Grabowski', 'Nowakowska', 'Pawlak'];
const infoOptions = ['Returning patient', 'First visit', 'Referred by Dr. Smith', 'Urgent follow-up', 'Annual checkup', 'Post-surgery', '', '', ''];
const commentOptions = ['Will attend the appointment', 'Asked to reschedule', 'Confirmed via SMS', 'Very polite', 'Had questions about parking', 'Confirmed', 'Not interested', 'Will call back'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  return `+48 ${Math.floor(500 + Math.random() * 400)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
}

function randomDate(daysBack = 30) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d.toLocaleDateString('pl-PL');
}

export function generateLeads(count = 55) {
  const leads = [];
  const statuses = ['Not called', 'Not called', 'Not called', 'No answer', 'No answer'];
  for (let i = 0; i < count; i++) {
    leads.push({
      id: i + 1,
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      phone: randomPhone(),
      info: randomItem(infoOptions),
      status: randomItem(statuses),
      priority: Math.floor(1 + Math.random() * 10),
    });
  }
  return leads;
}

export function generateCalls(count = 48) {
  const calls = [];
  const statuses = ['Confirmed', 'Confirmed', 'Declined'];
  for (let i = 0; i < count; i++) {
    calls.push({
      id: i + 1,
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      phone: randomPhone(),
      date: randomDate(60),
      status: randomItem(statuses),
      comment: randomItem(commentOptions),
    });
  }
  return calls;
}
