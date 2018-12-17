
function Stepium() {
	var that = this;

	this.init = function () {
		this.initModules();

	},
	this.initModules = function () {

        $(".send-form-data").on('click',function(){
            var order = {};
            var a = $(this);

            a.closest('form').find('.name').removeClass('error');
            a.closest('form').find('.email').removeClass('error');

            order.username = a.closest('form').find('.name').val();
            order.email = a.closest('form').find('.email').val();
            order.phone = a.closest('form').find('.phone').val();

            var error0 = false;

            if (order.username=='') {
                a.closest('form').find('.name').addClass('error');
                error0 = true;
            }

            var r = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!r.test(order.email)) {
                a.closest('form').find('.email').addClass('error');
                error0 = true;
            }

            if(!error0){
            	var body = {
                    username : order.username,
                    email : order.email,
                    phone : order.phone
				};
                $.ajax({
                    type: 'POST',
                    url: 'http://api.dev.kylbaba.com/api/v2/users/create/user/landing/',
                    data: body,
					success: function(result){
						alert('Регистрация прошла успешно! На указанный вами e-mail '+ order.email +' было отправлено письмо с подтверждением регистрации!');
						a.closest('form').find('.name').val('');
						a.closest('form').find('.email').val('');
						a.closest('form').find('.phone').val('');
                    },
                    error: function (error) {
						if(error['responseJSON']['code'] == 105){
                            alert('Ошибка! Такой email уже существует');
						} if(error['responseJSON']['email']){
                            alert('Ошибка! ' + error['responseJSON']['email'][0]);
                        }else{
                            alert('Ошибка! ' + error['responseJSON']['message']);
						}
                    },
                    dataType: 'json'
                });
            }
            if($('.reg-form')[0].checkValidity()) return false;
        });

	}
}

$( document ).ready(function() {
	var main = new Stepium();
	main.init();
});



