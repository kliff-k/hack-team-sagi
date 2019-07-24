var ID_APP_CACHE_STATIC='static35';
var ID_APP_CACHE_DYNAMIC='dynamic22'; //

var dominio_relativo='/sagirmps/';
if(self.location.href.indexOf('localhost')>0){
    dominio_relativo='/';
}
var ambiente_app =dominio_relativo+'bolsafamilia/';


//array com os arquivos do shell da aplicação, para montagem do layout e carregamento mais rápido
var ARR_FILES_SHELL_APP = [    
    ambiente_app+'index.html',
    ambiente_app+'lib/boostrap-material/bootstrap-material-design.min.css',
    ambiente_app+'css/fontawesome-free-5.8.2-web/css/all.min.css',
    ambiente_app+'css/ball-triangle-path.min.css',
    ambiente_app+'css/style.css',
    ambiente_app+'manifest.json',
    ambiente_app+'lib/popper.js',
    ambiente_app+'lib/jquery/jquery.js',
    ambiente_app+'lib/jquery/jquery.ui.js',
    ambiente_app+'lib/boostrap-material/bootstrap-material-design.js',
    ambiente_app+'js/promise.js',
    ambiente_app+'js/red.js',
    ambiente_app+'js/plataform_.js',
    ambiente_app+'js/fetch.js',    
    ambiente_app+'js/feeds.js',    
    ambiente_app+'js/funcoes.js',
    ambiente_app+'menu.html',
    ambiente_app+'menu-superior.html',
    ambiente_app+'img/android-chrome-512x512.png',
    ambiente_app+'img/apple-touch-icon.png',
    ambiente_app+'img/favicon.ico',
    ambiente_app+'img/ic_launcher36x36.png',
    ambiente_app+'img/ic_launcher48x48.png',
    ambiente_app+'img/ic_launcher72x72.png',
    ambiente_app+'img/ic_launcher96x96.png',
    ambiente_app+'img/ic_launcher144x144.png',
    ambiente_app+'img/ic_launcher192x192.png',
    ambiente_app+'img/ic_launcher512x512.png',
    ambiente_app+'img/Icon-App-20x20@1x.png',
    ambiente_app+'img/Icon-App-20x20@2x.png',
    ambiente_app+'img/Icon-App-20x20@3x.png',
    ambiente_app+'img/Icon-App-29x29@1x.png',
    ambiente_app+'img/Icon-App-29x29@2x.png',
    ambiente_app+'img/Icon-App-29x29@3x.png',
    ambiente_app+'img/Icon-App-40x40@1x.png',
    ambiente_app+'img/Icon-App-40x40@2x.png',
    ambiente_app+'img/Icon-App-40x40@3x.png',
    ambiente_app+'img/Icon-App-60x60@2x.png',
    ambiente_app+'img/Icon-App-60x60@3x.png',
    ambiente_app+'img/Icon-App-76x76@1x.png',
    ambiente_app+'img/Icon-App-76x76@2x.png',
    ambiente_app+'img/Icon-App-83.5x83.5@2x.png',
    ambiente_app+'img/ItunesArtwork@2x.png',
    ambiente_app+'img/logo2.png',
    ambiente_app+'img/Logo Bolsa Fam¡lia Cadastro Unico.png',
    ambiente_app+'img/pie.svg',
    ambiente_app+'img/projection.svg',
    ambiente_app+'img/undraw_done_a34v.png',
    ambiente_app+'img/undraw_done_a34v.svg',
    ambiente_app+'img/undraw_reading_list_4boi.svg',
    ambiente_app+'acoes-itinerantes.html',
    ambiente_app+'acoes-itinerantes2.html',
    ambiente_app+'articulacao-cras.html',
    ambiente_app+'articulacao-escolas2.html',
    ambiente_app+'articulacao-midia.html',
    ambiente_app+'articulacao-saude.html',
    ambiente_app+'articulacao-saude2.html',
    ambiente_app+'atualizacao-cadastral.html',
    ambiente_app+'atualizacao-cadastral-anual.html',
    ambiente_app+'atualizacao-pelo-numero.html',
    ambiente_app+'busca-ativa.html',
    ambiente_app+'carimbo-comprovante.html',
    ambiente_app+'carta.html',
    ambiente_app+'carta-gestao-estaduais.pdf',
    ambiente_app+'carta-prefeito-pbf.pdf',
    ambiente_app+'central-telefonica.html',
    ambiente_app+'contato-telefonico2.html',
    ambiente_app+'contratacao-equipe.html',
    ambiente_app+'contratacao-som.html',
    ambiente_app+'controle-gerencial.html',
    ambiente_app+'disseminacao-informacoes.html',
    ambiente_app+'documentos-tecnicos.html',
    ambiente_app+'entrevistas-domiciliares.html',
    ambiente_app+'envio-cartas.html',
    ambiente_app+'equipes.html',
    ambiente_app+'estrategias-de-gestao.html',
    ambiente_app+'FICHA 1.docx',
    ambiente_app+'FICHA 2.docx',
    ambiente_app+'FICHA 3.docx',
    ambiente_app+'FICHA 4.docx',
    ambiente_app+'fichas-planejamento.html',
    ambiente_app+'fichas-registro.html',
    ambiente_app+'gestao-cadastro.html',    
    ambiente_app+'insercoes-radios.html',
    ambiente_app+'instalacao-postos.html',
    ambiente_app+'multirao-rural.html',
    ambiente_app+'multiroes.html',
    ambiente_app+'outras-parcerias.html',
    ambiente_app+'painel.html',
    ambiente_app+'parceria-com-associacao.html',
    ambiente_app+'parcerias-administracao.html',
    ambiente_app+'parcerias-grupos-tradicionais.html',
    ambiente_app+'parcerias-icmbio.html',
    ambiente_app+'parcerias-indigenas.html',
    ambiente_app+'parcerias-saude.html',
    ambiente_app+'parceria-tribunal.html',
    ambiente_app+'planilha-controle-arquivo.html',    
    ambiente_app+'publicacoes-redes.html',
    ambiente_app+'publicacoes-sitios.html',
    ambiente_app+'relatorio-completo.html',
    ambiente_app+'relatorio-resumido.html',
    ambiente_app+'relatorio-resumido-estadual.html',
    ambiente_app+'relatorio-trabalho.html',
    ambiente_app+'reuniao-escolas.html',
    ambiente_app+'rodizio-funcionarios.html',
    ambiente_app+'tabela-porte.html',
    ambiente_app+'videos-premiorc.html',
    ambiente_app+'error404.html',
    'https://fonts.googleapis.com/css?family=Cabin:400,500,600,700|PT+Sans:400,700'
];

//ambiente_app+'PremioRosaniCunha_2016_1.pdf',


var ARR_URLS_DYNAMICS_SEMPRE_ATUALIZAR=[
    'https://aplicacoes.mds.gov.br/sagi/RIv3/geral/conteudo_modulo.php',
    '/cecad20/',
    'https://www.google-analytics.com/analytics.js'
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