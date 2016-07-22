(function(){

			}());

			$("button").click(function(){
				$('#info').html('<tr><th>Movie Poster</th><th>Details</th></tr>');
				

				var title=$("#s").val();
				// console.log(title);	
				$.ajax({
					type:'GET',
					url:'http://www.omdbapi.com/?s='+title,
					success: function(data) {

						// console.log(data);
						var trHTML = '';

						for(var i=0;i<data.Search.length;i++)
						{ 

					    	trHTML += '<tr><td><img src="'+data.Search[i].Poster+' alt="image not available"></td><td>Title  :'+data.Search[i].Title+'<br>Year:  '+data.Search[i].Year+'<br>imdbID:  '+data.Search[i].imdbID+'<br>Type:  '+data.Search[i].Type+'</td></tr>';
						}
						$('#info').append(trHTML);
					}
				});
			});
