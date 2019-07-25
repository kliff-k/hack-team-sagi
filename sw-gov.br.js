var ID_APP_CACHE_STATIC='static1';
var ID_APP_CACHE_DYNAMIC='dinamyc1'; //

var dominio_relativo='/';
if(self.location.href.indexOf('localhost')>0){
    dominio_relativo='/'+'hack-team-sagi/';
}else{
    dominio_relativo='/'+'conta/';
}
var ambiente_app =dominio_relativo;


//array com os arquivos do shell da aplicação, para montagem do layout e carregamento mais rápido
var ARR_FILES_SHELL_APP = [    
    ambiente_app+'index.html',
    'https://fonts.googleapis.com/css?family=Cabin:400,500,600,700|PT+Sans:400,700'
];

//ambiente_app+'PremioRosaniCunha_2016_1.pdf',


var ARR_URLS_DYNAMICS_SEMPRE_ATUALIZAR=[
    
];


self.addEventListener('install', function(event){
    console.log('[Service Worker] Installing Service Worker ...',event);
    event.waitUntil(
        caches.open(ID_APP_CACHE_STATIC)
        .then(function(cache){
            return cache.addAll(ARR_FILES_SHELL_APP);
        })
        .then(function(){
            return self.skipWaiting();
        })
    )
});

self.addEventListener('activate', function(event){
    console.log('[Service Worker] Activating Service Worker ...',event);
    event.waitUntil(
        caches.keys()
        .then(function(keyList){
            return Promise.all(keyList.map(function(key){  
                console.log('caches=>',key,ID_APP_CACHE_STATIC);
                if(key!==ID_APP_CACHE_STATIC){
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});

function isInArray(string, array) {
    for (var i = 0; i < array.length; i++) {
        
        if (array[i] === string) {
        return true;
        }
    }
    return false;
}

function isIndexOfArray(string, array) {
    if(typeof string=='undefined' || string=='')
        return false;

    for (var i = 0; i < array.length; i++) {   
        //console.log('teste=> ',string+' = '+array[i]);         
      if (string.indexOf(array[i])>-1) {        
        return true;
      }else{
        
      }
    }
    return false;
}
// self.addEventListener('fetch',function(event){
//     event.respondWith(fetch(event.request));
// });

self.addEventListener('fetch', function(event){
    if(isIndexOfArray(event.request.url,ARR_URLS_DYNAMICS_SEMPRE_ATUALIZAR)){          
        event.respondWith(
            caches.open(ID_APP_CACHE_DYNAMIC)
            .then(function(cache){
                return fetch(event.request)
                .then(function(res){
                    cache.put(event.request.url,res.clone());
                    return res;
                })
            })
            .catch(function(err){
                console.log('não foi possível obter a SUPER URL, então retorna do cache',err);
                
                return caches.match(event.request)
                .then(function(response){
                    if(response){
                        return response;
                    }else{
                        return ;
                    }
                })
                
            })
        )
    }else if(isInArray(event.request.url, ARR_FILES_SHELL_APP)){
        //console.log('cache statico:',event.request.url);
        event.respondWith(
            caches.match(event.request)
        );
    }else{
        event.respondWith(
            caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }else{
                    return fetch(event.request)
                    .then(function(res){
                        return caches.open(ID_APP_CACHE_DYNAMIC)
                        .then(function(cache){
                            cache.put(event.request.url,res.clone());
                            return res;
                        });
                    })
                    .catch(function(err){
                        //algo aconteceu de estranho
                    })
                }
            })
        );
    }
});




self.addEventListener('notificationclick',function(event){
    var notification = event.notification;
    var action = event.action;

    console.log(notification);

    if(action=='confirm'){
        console.log('Confirm was chosen');
        notification.close();
    }else{
        console.log(action);
        notification.close();
    }
});


self.addEventListener('notificationclose',function(event){
    //
});