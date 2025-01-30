const supabaseUrl = "https://pnbielvmkcexbdblnyep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuYmllbHZta2NleGJkYmxueWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NzI2MDQsImV4cCI6MjA1MzQ0ODYwNH0.6Xt2NKhVKEXwzaEwe03jX2cy0AE1hFta6ZfkXGTp2vE";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabaseClient);

const cart = document.getElementById('cart')

async function fetchcart() {
    const { data: products, error: producterror } = await supabaseClient
      .from("product")
      .select();
    //   console.log(product);
    for (var i = 0; i < products.length; i++) {
      
      const product = products[i];
      
      fetchcarttoui(product);
    }
  }


function fetchcarttoui(products) {
    console.log(products);
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
            <button class="btn btn-primary">Add to Cart</button>
            <button onclick="buycart(${products.id})" class="btn btn-danger">Buy Now</button>
          </div>
        </div>`;
    //   console.log(cartchild);
  
    cart.appendChild(cartchild);

  }
  
  fetchcart()
function buycart(buyid){
    console.log(buyid);
    localStorage.setItem('productid',buyid)
    window.location.href = '/buy.html'
    
}