   function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var _id=document.getElementById("_id_row"+no);
 var app=document.getElementById("app_row"+no);
 var username=document.getElementById("username_row"+no);
	
	
	 var nome=document.getElementById("nome_row"+no);
 var num_tel=document.getElementById("num_tel_row"+no);
 var morada=document.getElementById("morada_row"+no);
	
	 var email=document.getElementById("email_row"+no);
 var medicEmail=document.getElementById("medicEmail_row"+no);
 var utente=document.getElementById("utente_row"+no);
	 var data_nasc=document.getElementById("data_nasc_row"+no);
 var benefeciario=document.getElementById("benefeciario_row"+no);
 
	
	
 var _id_data=_id.innerHTML;
 var app_data=app.innerHTML;
 var username_data=username.innerHTML;
 
 var nome_data=nome.innerHTML;
 var num_tel_data=num_tel.innerHTML;
 var morada_data=morada.innerHTML;
	
	 var email_data=email.innerHTML;
 var medicEmail_data=medicEmail.innerHTML;
 var utente_data=utente.innerHTML;
  var data_nasc_data=data_nasc.innerHTML;
  var benefeciario_data=benefeciario.innerHTML;
	
 _id.innerHTML="<input type='text' id='_id_text"+no+"' value='"+_id_data+"'>";
 app.innerHTML="<input type='text' id='app_text"+no+"' value='"+app_data+"'>";
 username.innerHTML="<input type='text' id='username_text"+no+"' value='"+username_data+"'>";
 
 
 nome.innerHTML="<input type='text' id='nome_text"+no+"' value='"+nome_data+"'>";
 num_tel.innerHTML="<input type='text' id='num_tel_text"+no+"' value='"+num_tel_data+"'>";
 morada.innerHTML="<input type='text' id='morada_text"+no+"' value='"+morada_data+"'>";
 
 
 email.innerHTML="<input type='text' id='email_text"+no+"' value='"+email_data+"'>";
 medicEmail.innerHTML="<input type='text' id='medicEmail_text"+no+"' value='"+medicEmail_data+"'>";
 utente.innerHTML="<input type='text' id='utente_text"+no+"' value='"+utente_data+"'>";
 
 
 data_nasc.innerHTML="<input type='text' id='data_nasc_text"+no+"' value='"+data_nasc_data+"'>";
 benefeciario.innerHTML="<input type='text' id='benefeciario_text"+no+"' value='"+benefeciario_data+"'>";
 
 
 
}

function save_row(no)
{
 var _id_val=document.getElementById("_id_text"+no).value;
 var app_val=document.getElementById("app_text"+no).value;
 var username_val=document.getElementById("username_text"+no).value;
	
	 var nome_val=document.getElementById("nome_text"+no).value;
 var num_tel_val=document.getElementById("num_tel_text"+no).value;
 var morada_val=document.getElementById("morada_text"+no).value;
	
	 var email_val=document.getElementById("email_text"+no).value;
 var medicEmail_val=document.getElementById("medicEmail_text"+no).value;
 var utente_val=document.getElementById("utente_text"+no).value;
	
	 var data_nasc_val=document.getElementById("data_nasc_text"+no).value;
 var beneficiario_val=document.getElementById("beneficiario_text"+no).value;

document.getElementById("_id_row"+no).innerHTML=_id_val;
document.getElementById("app_row"+no).innerHTML=app_val;;
document.getElementById("username_row"+no).innerHTML=username_val;
	
document.getElementById("nome_row"+no).innerHTML=nome_val;
document.getElementById("num_tel_row"+no).innerHTML=num_tel_val;
document.getElementById("morada_row"+no).innerHTML=morada_val;
	
document.getElementById("email_row"+no).innerHTML=email_val;
document.getElementById("medicEmail_row"+no).innerHTML=medicEmail_val;
document.getElementById("utente_row"+no).innerHTML=utente_val;
	
document.getElementById("data_nasc_row"+no).innerHTML=data_nasc_val;
document.getElementById("beneficiario_row"+no).innerHTML=beneficiario_val;




 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}