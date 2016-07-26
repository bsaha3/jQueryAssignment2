(function(){

			$('#count').hide();
			$('#create').hide();
				
				//event for button update
				$('button#update').click(function(){

				 	var id=parseInt($('div#myModal div.modal-body input#ID').val()),
				 		name=$('div#myModal div.modal-body input#Name').val(),
						age=parseInt($('div#myModal div.modal-body input#Age').val()),
						gender=$('div#myModal div.modal-body input#Gender').val(),
						company=$('div#myModal div.modal-body input#Company').val(),
						email=$('div#myModal div.modal-body input#Email').val(),
						phone=$('div#myModal div.modal-body input#Phone').val(),
						address=$('div#myModal div.modal-body input#Address').val(),
						registered=$('div#myModal div.modal-body input#Registered').val();

					$.ajax({
					    type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
					    dataType: 'json', // Set datatype - affects Accept header
					    url: "http://localhost:8081/emp/"+id, // A valid URL
					    headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
					    data: JSON.stringify({
						    	id: id,
						    	name: name,
						    	age: age,
						    	gender: gender,
						    	company: company,
						    	email: email,
						    	phone: phone,
						    	address: address,
						    	registered: registered

							}) // Some data e.g. Valid JSON as a string
						});// end of ajax for PUT
						alert("Successfully updated");
						
						//retreiving data for each id
						$.ajax({
						type:'GET',
						url:'http://localhost:8081/emp/'+id,
						success: function(data) {

							var y=$('div#myModal div.modal-body input#invisible').val();
							var row=$('.'+y).parent().parent();

							// console.log($('.'+y).parent().parent());

							row.children('td:eq(1)').text(data.name);
							row.children('td:eq(2)').text(data.age);
							row.children('td:eq(3)').text(data.gender);
							row.children('td:eq(4)').text(data.company);
							row.children('td:eq(5)').text(data.email);
							row.children('td:eq(6)').text(data.phone);
							row.children('td:eq(7)').text(data.address);
							row.children('td:eq(8)').text(data.registered);
						    
						}});//end of inner ajax			
				});//end of click button#update	
			}());// end of anonymous function

			var d=1;

			//event for showing the data
			$("#f1").submit(function(e){
				$('#create').hide();
				full();	
				// $('#count').addClass('list-of-posts');
				$('#count').show();

				e.preventDefault();

				
			});

			//event for showing the create table
			$(".add").click(function(){
				$('#count').hide();
				$('#create').show();
				// console.log($('div#myModal div.modal-body input#Name'));	
			});

			//creating new data
				$('button#new').click(function(){

				 	var name=$('div#create input#Name').val(),
						age=parseInt($('div#create input#Age').val()),
						gender=$('div#create input#Gender').val(),
						company=$('div#create input#Company').val(),
						email=$('div#create input#Email').val(),
						phone=$('div#create input#Phone').val(),
						address=$('div#create input#Address').val(),
						registered=$('div#create input#Registered').val();

					$.ajax({
					    type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
					    dataType: 'json', // Set datatype - affects Accept header
					    url: "http://localhost:8081/emp", // A valid URL
					    headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
					    data: JSON.stringify({
					    	name: name,
					    	age: age,
					    	gender: gender,
					    	company: company,
					    	email: email,
					    	phone: phone,
					    	address: address,
					    	registered: registered

					    }) // Some data e.g. Valid JSON as a string
					});//end of POST ajax call
					alert("Successfully created a data");
				});//end of click button#new

		//function for loading the database
		function full()
		{
			$('#info').empty();
			var s=$('#s').val();
			// console.log(s);
			if(s=="")
			{
				alert("Please Enter A Text");
			}
			else
			{
				var trHTML = '<tr class="post"><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Company\
				</th><th>Email</th><th>Phone</th><th>Address</th><th>Registered</th><th>Update</th><th>Delete</th></tr>';
				$('#info').append(trHTML);
				d=1;
				$.ajax({
					type:'GET',
					url:'http://localhost:8081/emp?q='+s,
					success: function(data) {
						trHTML = '';
						var	c=1,e=1;
							if(data.length==0)
							{
								alert("No records found..")
							}

						for(var i=0;i<data.length;i++)
						{ 	
							if(e==13)
							{
								d++;
								e=1;
							}
							e++;

							trHTML = '<tr class="'+d+'"><td data-title="ID">'+data[i].id+'</td><td data-title="Name">\
							'+data[i].name+'</td><td data-title="Age">'+data[i].age+'</td>\
							<td data-title="Gender">'+data[i].gender+'</td><td data-title="Company">'+data[i].company+'</td>\
							<td data-title="Email">'+data[i].email+'</td>\
							<td data-title="Phone">'+data[i].phone+'</td><td data-title="Address">'+data[i].address+'</td>\
							<td data-title="Registered">'+data[i].registered+'</td>\
							<td data-title="Update"><button href="#myModal" data-toggle="modal" class="btn btn-info" id="up'+c+'">Update</button></td>\
							<td data-title="Delete"><button class="btn btn-danger" id="dl'+c+'">Delete</button></td></tr>';

							$('#info').append(trHTML);

							

							$('div#count td button#up'+c).addClass("bt"+data[i].id);


							//Event for update buttons
							$('div#count td button.bt'+data[i].id+'').click(function(){
								var y=$(this).attr('class');								
								var x=parseInt(y.substring(15));
								
								//retreiving data for each data and filling the modal
								$.ajax({
								type:'GET',
								url:'http://localhost:8081/emp/'+x,
								success: function(data) {
											$('div#myModal div.modal-body input#ID').val(x);
											$('div#myModal div.modal-body input#Name').val(data.name);
											$('div#myModal div.modal-body input#Age').val(data.age);
											$('div#myModal div.modal-body input#Gender').val(data.gender);
											$('div#myModal div.modal-body input#Company').val(data.company);
											$('div#myModal div.modal-body input#Email').val(data.email);
											$('div#myModal div.modal-body input#Phone').val(data.phone);
											$('div#myModal div.modal-body input#Address').val(data.address);
											$('div#myModal div.modal-body input#Registered').val(data.registered);
											$('div#myModal div.modal-body input#invisible').val(y.substring(13));
								}});//end of inner ajax
							});//end of button update

							$('div#count td button#dl'+c).addClass("bt"+data[i].id);

							//button delete start
							$('div#count td button#dl'+c+'').click(function(){
								var deleteRow=$(this).parent().parent();
								var x=$(this).attr('class');
								
								x=parseInt(x.substring(17));
								
								$.ajax({
										type: 'DELETE', 
									    dataType: 'json', // Set datatype - affects Accept header
									    url: "http://localhost:8081/emp/"+x, // A valid URL
									    headers: {"Content-Type": "application/json"}, // 
									    success:function(){

											    	alert('deleted');
													deleteRow.fadeOut(600, function(){
													deleteRow.remove();
													});
									    		},
									    error: 	function() {
									    			alert("Error occurred");
									    		}			
									 });//end of inner ajax
							});// end of delete button

							c++;
						}//for end

						$("#info tr").not(':first').hide();
						$('.1').show();
					}// end of success
				});//end of ajax
			}
		}//end of function for full database

		var a=1;

		//event for next page
		$("#2").click(function(){
				a++;
				if(a>d)
				{
					a=1;
				}

				$("#info tr").not(':first').hide();
				$('.'+a).show();
				
			});

		//event for previous page
		$("#1").click(function(){
				a--;
				if(a==0)
				{
					a=d;
				}

				$("#info tr").not(':first').hide();
				$('.'+a).show();
			});

		 // $("#myTbl tr:not(first-child)").hide(); 