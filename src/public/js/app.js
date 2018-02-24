
function cargar_push()
{
  $.ajax({

      url: 'https://api.coinmarketcap.com/v1/ticker/bitcoin/',
      type: 'GET',

    })
    .done(function(data) {
      console.log(data);

      $('#btc').html(data[0].price_usd);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    setTimeout('cargar_push()', 60000);
}
