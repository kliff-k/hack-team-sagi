function formataData(dt){
    var arr = dt.split(' ');
    var arr0 = arr[0].split('-');

    var new_data = arr0[2]+'/'+arr0[1]+'/'+arr0[0]+' '+arr[1];
    return new_data;
}
function getUltimosAcessosJson(qtd){  
    $("#local-atividades").html('<div><i class="fa fa-spinner fa-spin"></i>&nbsp;carregando...</div>');
    var url = 'https://www.hs2019st.com/rest/api/ultimos_acessos_externos/'+cpfUsuario;

    fetch(url)
    .then(function(result){
        return result.json();
    })
    .then(function(data){
        return processaJsonAtividades(data,qtd);
    })
}

function processaJsonAtividades(data,qtd){
    if(!qtd || typeof qtd=='undefined' || qtd=='null' || qtd==null){
        qtd=0;
    }

    if(data.length<=0){
        $("#local-atividades").html('<span>Nenhum registro encontrado...</span>');    
        return false;
    }

    var txt='';
    if(qtd>0){
        if(qtd>data.length)
            qtd = data.length;
    }else{
        qtd = data.length;
    }
    for(var i=0; (i<qtd);i++){
        var dt = formataData(data[i].data_evento);
        var cidade = data[i].nome_municipio_sem_acento;
        var uf = data[i].sigla_uf;
        var dispositivo = 'Google Chrome';
        
        txt+='<span class="lista-atividade '+(i==0?' atividade0':'')+'"><i class="fa fa-check-circle text-primary"></i>&nbsp;'+dt+', '+cidade+'/'+uf+'</span>';
    }
    $("#local-atividades").html(txt);
}



function getAcessosSuspeitosJson(qtd){  
    $("#local-atividades-suspeitas").html('<div><i class="fa fa-spinner fa-spin"></i>&nbsp;carregando...</div>');
    var url = 'https://www.hs2019st.com/rest/api/ultimos_acessos_externos/'+cpfUsuario;

    fetch(url)
    .then(function(result){
        return result.json();
    })
    .then(function(data){
        return processaJsonAtividadesSuspeitas(data,qtd);
    })
}

function processaJsonAtividadesSuspeitas(data,qtd){
    if(!qtd || typeof qtd=='undefined' || qtd=='null' || qtd==null){
        qtd=0;
    }

    if(data.length<=0){
        $("#local-atividades-suspeitas").html('<span>Nenhum registro encontrado...</span>');    
        return false;
    }

    var txt='';
    if(qtd>0){
        if(qtd>data.length)
            qtd = data.length;
    }else{
        qtd = data.length;
    }
    for(var i=0; (i<qtd);i++){
        var dt = formataData(data[i].data_evento);
        var cidade = data[i].nome_municipio_sem_acento;
        var uf = data[i].sigla_uf;
        var dispositivo = 'Google Chrome';
        
        txt+='<span class="lista-atividade '+(i==0?' atividade0':'')+'"><i class="fa fa-exclamation-triangle text-warning"></i>&nbsp;'+dt+', '+cidade+'/'+uf+'</span>';
    }
    $("#local-atividades-suspeitas").html(txt);
}


function mostraOcultaNotificacoes(){
    var obj=$("#lc-item-notificacao");
    var pos = $("p").position();
    console.log(pos);
    var t = 0+85;
    var l = 850;

    if($(window).width()<l){
        l=0;
    }



    
    
    
    $("#dvItemsNotificacao").css({top: t, left: l});
    $("#dvItemsNotificacao").toggle();
}

