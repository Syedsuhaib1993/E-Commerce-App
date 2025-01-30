const supabaseUrl = "https://pnbielvmkcexbdblnyep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuYmllbHZta2NleGJkYmxueWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NzI2MDQsImV4cCI6MjA1MzQ0ODYwNH0.6Xt2NKhVKEXwzaEwe03jX2cy0AE1hFta6ZfkXGTp2vE";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabaseClient);

const title = document.getElementById("title")
const desc = document.getElementById("description")
const price = document.getElementById('price')
const img = document.getElementById('img')
// console.log(title,desc,price,img);


const buyid = localStorage.getItem('productid')
// console.log(buyid);

async function getbuyproduct(){
    const { data, error } = await supabaseClient
  .from('product')
  .select()
  .eq('id' , buyid)
  .single()
    console.log(data);
    title.innerHTML = data.title
    desc.innerHTML = data.description
    price.innerHTML = data.price
    img.setAttribute('src',`${supabaseUrl}/storage/v1/object/${data.imgUrl}`)
}

getbuyproduct()

function backtobuyer(){
    window.location.href = '/buyer.html'
}
