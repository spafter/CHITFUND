$(document).ready(function(){
		$("#signup").click(function(){
			window.open('https://www.stage2md041.qa.paypal.com/webapps/merchantboarding/webflow/unifiedflow?execution=e1s1');
			});
		$( "#datepicker" ).datepicker({dateFormat: "yyyy-mm-dd"});
		 $('#basicExample').timepicker();

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
setInterval(function(){ call_subscriber(); }, 1000);

