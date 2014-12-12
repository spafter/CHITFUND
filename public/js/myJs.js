$(document).ready(function(){
		$("#signup").click(function(){
			window.open('https://www.stage2md041.qa.paypal.com/webapps/merchantboarding/webflow/unifiedflow?execution=e1s1');
			});
		$( "#datepicker" ).datepicker({dateFormat: "yyyy-mm-dd"});
		$('#basicExample').timepicker();
		dummy();
		if(getUrlParameter('money_sent') != undefined){
			$("#sendMoney").hide();
			$("#updateBid").show();
			}
			else
			{
			$("#sendMoney").show();
			$("#updateBid").hide();
			}
			
		});

function call_subscriber()
{
	$.ajax({
url: '/getsubscribers',
type: 'get',
success: function(res)
{
$('#table_subscriber').html(res);
}

});
}
function dummy(){
	call_subscriber();
	setInterval(function(){ call_subscriber(); }, 3000);
};
function getUrlParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) 
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) 
		{
			return sParameterName[1];
		}
	}
}       
