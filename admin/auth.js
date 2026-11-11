async function checkAdmin(){
 try{
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(!session){location.href='login.html';return;}
  const {data:profile,error}=await supabaseClient.from('profiles').select('role').eq('id',session.user.id).maybeSingle();
  if(error||profile?.role!=='admin'){location.href='../index.html';return;}
  window.currentUserIsAdmin=true;
 }catch(e){console.error('Weryfikacja administratora:',e);location.href='../index.html';}
}
checkAdmin();
async function logout(){await supabaseClient.auth.signOut();location.href='login.html';}
