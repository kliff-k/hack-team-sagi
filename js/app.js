var deferredPrompt;

if(!window.Promise){
    window.Promise = Promise;
}

var dominio_relativo='/sagirmps/';
if(window.location.href.indexOf('localhost')>0){
    dominio_relativo='/';
}
var ambiente_app =dominio_relativo+'bolsafamilia/';
// console.log('ambiente no app=>',ambiente_app);

if(typeof(sessionStorage) == 'undefined')
{
    sessionStorage = {
        getItem: function(){},
        setItem: function(){},
        clear: function(){},
        removeItem: function(){}
    };
}

if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register(ambiente_app+'sw-bfnsm.js',{scope: ambiente_app})    
    .then(function(){
        console.log("Service Worker registered.");
    })
    .catch(function(err){
        console.log("[Service Worker] Falha ao tentar registrar o Service Worker",err);
    });
}

/*
    Prompt de instalação do aplicativo
*/
window.addEventListener('beforeinstallprompt',function(event){
    console.log('beforeinstallprompt fired');
    event.preventDefault;
    deferredPrompt = event;
    return false;
});


var promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        reject({code: 500, message: 'An error occurred!'});
    },3000);
});


/*
//vamos montar o menu da aplicação
*/

fetch('menu-superior.html')
.then(function(obj){    
    return obj.text();
    
})
.then(function(txt){    
    $('#menu-barra-superior').html(txt);            
    $('.sidebarCollapse').on('click',function(){
        $('#sidebar').toggleClass('active');
    });

    // $('.navbar,.body-container').on('click',function(){
    //     $('#sidebarCollapse').click();
    // });
});

fetch('menu.html')
.then(function(obj){    
    return obj.text();
})
.then(function(txt){    
    $('#sidebar').html(txt);                
    $('[data-toggle="tooltip"]').tooltip({
        trigger: "hover",
    })
});


function displayConfirmNotification(){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.ready
        .then(function(swreg){
            var options={
                body:'!!!!!',
                icon:'/bolsafamilia/img/favicon-32x32.png',
                image: '',
                dir:'ltr',
                lang:'pt-BR',
                vibrate:[100,50,200],
                badge: '/bolsafamilia/img/favicon-32x32.png',
                tag: 'confirm-notification',
                renotify: true,
                actions: [
                    {action: 'confirm', title:'Okay', icon: '/bolsafamilia/img/favicon-32x32.png'},
                    {action: 'cancel', title:'Canbcel', icon: '/bolsafamilia/img/favicon-32x32.png'}
                ]
            };
            swreg.showNotification('Successfully subscribed (from SW)!',options);
        });
    }
    
}

function askForNotificationPermission(){    
    Notification.requestPermission(function(result){
        console.log('User Choice',result);
        if(result !=='granted'){
            console.log('No notification permission granted');
        }else{
            console.log('Notification permission granted'); 
            displayConfirmNotification();
        }
    })
}
// var enableNotificationsbuttons = document.querySelectorAll('.enable-notifications');
// console.log(enableNotificationsbuttons);


