const supabaseUrl = "https://pnbielvmkcexbdblnyep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuYmllbHZta2NleGJkYmxueWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NzI2MDQsImV4cCI6MjA1MzQ0ODYwNH0.6Xt2NKhVKEXwzaEwe03jX2cy0AE1hFta6ZfkXGTp2vE";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabaseClient);

const tablebody = document.getElementById('tablebody')
console.log(tablebody);



async function fetchdsells() {
    
    const { data, error } = await supabaseClient
  .from('sells')
  .select()
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const tab = document.createElement('tr')
    tab.innerHTML = ` <th scope="row">${i+1}</th>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td>${element.productid}</td>
            <td>${element.userid}</td>`
    tablebody.appendChild(tab)
  }
    
}

fetchdsells()