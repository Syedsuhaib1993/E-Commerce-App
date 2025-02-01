const supabaseUrl = 'https://pnbielvmkcexbdblnyep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuYmllbHZta2NleGJkYmxueWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NzI2MDQsImV4cCI6MjA1MzQ0ODYwNH0.6Xt2NKhVKEXwzaEwe03jX2cy0AE1hFta6ZfkXGTp2vE'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabaseClient);


const emailInp = document.getElementById('inputEmail4')
const passInp = document.getElementById('inputPassword4')
const addressInp = document.getElementById('inputAddress')
const cityInp = document.getElementById('inputCity')
const roleInp = document.getElementById('inputRole')

const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const signin = document.querySelector('.signin')
const signup = document.querySelector('.signup')
 
function switchToSignup(){
  signin.setAttribute('class','d-none')
  signup.setAttribute('class','d-block')
  
  
}

async function signUp(){
    const email = emailInp.value
    const password = passInp.value
    const address = addressInp.value
    const city = cityInp.value
    const role = roleInp.value
    // console.log(email,password,address,city,role);

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
      })
      console.log(data.user.id);
      
    if (!error) {
        console.log('signup success');
        
    }

    const {data:userdata, error:usererror } = await supabaseClient
  .from('users')
  .insert({ address,
    city,
    role,
    uid:data.user.id})
  .select()

  
  
    console.log(userdata[0]);
    
}

async function signIn(){
    const Email = inputEmail.value
    const Password = inputPassword.value
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: Email,
        password: Password,
      })


      if(error){
        alert('login failed')
        return
      }
  console.log(data.user.id);
      const { data:tabledata, error:tableerror } = await supabaseClient
  .from('users')
  .select()
  .eq('uid',data.user.id)
  .single()
  console.log(tabledata);
  
if(tabledata.role==="vendor"){
  window.location.href = "/vendor.html"
}else if(tabledata.role==="buyer"){
  window.location.href = "/buyer.html"
}else if(tabledata.role==="admin"){
  window.location.href = "/admin.html"
}else{
  alert('no match found')
}
      
}
