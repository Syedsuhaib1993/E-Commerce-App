const supabaseUrl = "https://pnbielvmkcexbdblnyep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuYmllbHZta2NleGJkYmxueWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NzI2MDQsImV4cCI6MjA1MzQ0ODYwNH0.6Xt2NKhVKEXwzaEwe03jX2cy0AE1hFta6ZfkXGTp2vE";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabaseClient);

const titleinp = document.getElementById("title");
const descinp = document.getElementById("desc");
const priceinp = document.getElementById("price");
const picinp = document.getElementById("pic");
const cart = document.getElementById("cart");

const key = localStorage.getItem('sb-pnbielvmkcexbdblnyep-auth-token')
const keyParse = JSON.parse(key)
console.log(keyParse.user.id);


async function fetchcart() {
  const { data: products, error: producterror } = await supabaseClient
    .from("product")
    .select()
    .eq('userid',keyParse.user.id);
  //   console.log(product);
  for (var i = 0; i < products.length; i++) {
    // console.log(products[i]);
    const product = products[i];
    fetchcarttoui(product);
  }
}

async function addproduct() {
  const title = titleinp.value;
  const price = priceinp.value;
  const description = descinp.value;
  const pic = picinp.files;
  cart.innerHTML = ''
  // console.log(title,price,description);
  // console.log(pic[0]);

  const picFile = pic[0];
  const picFileName = `${Date.now()}-${picFile.name}`;

  const { data, error: picError } = await supabaseClient.storage
    .from("images")
    .upload(picFileName, picFile, {
      cacheControl: "3600",
      upsert: false,
    });
  //   if (!picError) {
  //     alert('pic upload')
  //   }
  console.log(data.fullPath);

  const { error } = await supabaseClient
    .from("product")
    .insert({ title,
       description,
        price, 
        imgUrl: data.fullPath,
        userid: keyParse.user.id});
  if (!error) {
    alert("upload");
  }
 titleinp.value = "" 
 descinp.value = ""
 priceinp.value=""
//  picinp.files = null

  fetchcart()
}





function fetchcarttoui(products) {
  const cartchild = document.createElement("div");
  cartchild.className = "col-md-3 col-sm-6 container";
  cartchild.innerHTML = ` <div class="card gap-3 mt-2">
        <img style="width: 100%; height: 200px;" src="${supabaseUrl}/storage/v1/object/${products.imgUrl}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${products.title}</h5>
          <p class="card-text">${products.description}.</p>
          <p class="card-text">${products.price}</p>
        </div>
        <div class="container">
          <button class="btn btn-primary">Edit</button>
          <button onclick="delcart(${products.id})" class="btn btn-danger">Delete</button>
        </div>
      </div>`;
  //   console.log(cartchild);

  cart.appendChild(cartchild);
}


async function delcart(delid) {
  // console.log('run');
  // console.log(delid);
  const response = await supabaseClient
    .from("product")
    .delete()
    .eq("id", delid);
  window.location.reload();
}
fetchcart();