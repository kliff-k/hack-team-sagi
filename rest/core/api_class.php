<?php

class API
{
    /**
     * Objeto da classe banco.php, utilizada em vários métodos da api.
     * @access protected
     * @var object
     * @name $bd
     */
    protected $bd;

    /**
     * String com o método da requisição (GET, PUT, POST, PATCH, DELETE, OPTIONS)
     * @access private
     * @var string
     * @name $method
     */
    private $method;

    /**
     * String com a fonte a ser consultada.
     * @access private
     * @var string
     * @name $source
     */
    private $source;

    /**
     * Array com os fragmentos do caminho.
     * @access private
     * @var array
     * @name $path
     */
    private $path;

    /**
     * String com o endpoint chamado.
     * @access private
     * @var string
     * @name $endpoint
     */
    private $endpoint;

    /**
     * String com o tipo de auth no header AUTHORIZATION ({auth} TOKEN).
     * @access private
     * @var string
     * @name $auth
     */
    private $auth;

    /**
     * Integer com o id do usuário requisitante (Quando a chamada possui algum tipo de autenticação)
     * @access private
     * @var int
     * @name $user
     */
    private $user;

    /**
     * String com o token no header AUTHORIZATION (AUTH {token}).
     * @access private
     * @var string
     * @name $auth
     */
    private $token;

    /**
     * String com a chave de acesso no header AUTHORIZATION ({access_key}:{signature}).
     * @access private
     * @var string
     * @name $auth
     */
    private $key;

    /**
     * String com a assinatura no header AUTHORIZATION ({access_key}:{signature}).
     * @access private
     * @var string
     * @name $auth
     */
    private $sig;

    /**
     * String com a timestamp vindo do header DATE.
     * @access private
     * @var string
     * @name $date
     */
    private $date;

    /**
     * Array proveniente do JSON no corpo da requisição, contém os dados para requisições POST/PUT/PATCH.
     * @access private
     * @var array
     * @name $data
     */
    private $data;

    /**
     * SRA constructor.
     * O construtor da classe se encarrega de:
     * 1. Capturar todas as informações da requisição feita à API:
     *    method: GET,PUT, POST, PATCH, DELETE (Request).
     *    path: /caminho/da/requisicao (URI).
     *    auth: chave_do_usuario:assinatura_do_usuario (http header).
     *    date: data_de_requisicao (http header).
     *    data: dados do corpo da requisição (json).
     * 2. Instanciar a classe Banco (Que gerenciará o acesso e todas a requisições aos BDs da SAGI).
     * 3. Executar a chamada.
     */
    public function __construct ()
    {
        // Captura todas as variáveis necessárias.
        $this->method   = $_SERVER['REQUEST_METHOD'];
        $this->date     = $_SERVER["HTTP_DATE"];
        $this->data     = json_decode(file_get_contents('php://input'),true);
        $this->auth     = explode(' ',$_SERVER["HTTP_AUTHORIZATION"])[0];
        $this->token    = explode(' ',$_SERVER["HTTP_AUTHORIZATION"])[1];
        $this->key      = explode(':',$this->token)[0];
        $this->sig      = explode(':',$this->token)[1];
        $this->source   = explode('/',$_SERVER['REQUEST_URI'])[3];
        $this->path     = array_slice(explode('/',explode('?',$_SERVER['REQUEST_URI'])[0]),3);
        $this->endpoint = '/'.implode('/',$this->path);

        // Inicializa a conexão com o banco Postgres (HACK!)
        $this->bd = new PDO('pgsql:host=35.199.126.20 port=5432 dbname=hackathon user=hackathon password=Sagi@Mds');

        // Executa a chamada à fonte requisitada.
        $this->execSource();
    }

    /**
     * Destructor.
     * Fecha a conexão com o banco.
     */
    public function __destruct()
    {
        unset($this->bd);
    }

    /**
     * Executa a chamada referente à fonte requisitada no PATH.
     * @access private
     */
    private function execSource ()
    {
        // Endpoints
        switch ($this->path[0])
        {
            case 'login_usuario':
                switch ($this->method)
                {
                    case 'POST':
                        if(!$this->data['cpf'] || !$this->data['senha'])
                            $this->endExec(400,['Dados incompletos']);

                        $select = "SELECT * FROM tb_usuario WHERE cpf = ? AND senha = ?;";
                        $result = $this->bd->prepare($select);
                        $cpf = $this->data['cpf'];
                        $senha = $this->data['senha'];
                        $result->execute([$cpf,$senha]);

                        if($result->fetch(PDO::FETCH_ASSOC))
                            $this->endExec(200,[true]);
                        else
                            $this->endExec(200,[false]);

                        break;
                }
                break;

            case 'dados_usuario':
                switch ($this->method)
                {
                    case 'GET':
                        if(!$this->path[1])
                            $this->endExec(400,['CPF não informado']);

                        $select = "SELECT * FROM tb_usuario WHERE cpf = ?;";
                        $result = $this->bd->prepare($select);
                        $result->execute([$this->path[1]]);
                        break;
                }
                break;

            case 'ultimos_acessos_internos':
                switch ($this->method)
                {
                    case 'GET':
                        if(!$this->path[1])
                            $this->endExec(400,['CPF não informado']);

                        $select = "SELECT * FROM tb_acesso_gov_br WHERE cpf = ? ORDER BY data_evento DESC LIMIT 100;";
                        $result = $this->bd->prepare($select);
                        $result->execute([$this->path[1]]);
                        break;
                }
                break;

            case 'ultimos_acessos_externos':
                switch ($this->method)
                {
                    case 'GET':
                        if(!$this->path[1])
                            $this->endExec(400,['CPF não informado']);

                        $select = "SELECT * FROM tb_acesso_externo tae LEFT JOIN tb_geo_ip tgi ON tae.remote_address = tgi.remote_address WHERE cpf = ? ORDER BY data_evento DESC LIMIT 100;";
                        $result = $this->bd->prepare($select);
                        $result->execute([$this->path[1]]);
                        break;
                }
                break;

            case 'notificacoes':
                switch ($this->method)
                {
                    case 'GET':
                        if(!$this->path[1])
                            $this->endExec(400,['CPF não informado']);

                        $select = "select a.*, n.ds_notificacao
                            from tb_acesso_gov_br a 
                            left join tb_acessos_suspeitos s on (a.cpf=s.cpf and a.data_evento=s.data_evento)
                            left join tb_notificacao n on (s.id_notificacao=n.id_notificacao)
                            WHERE a.cpf = ? ORDER BY s.data_evento DESC LIMIT 100;";

                        $result = $this->bd->prepare($select);
                        $result->execute([$this->path[1]]);
                        break;
                }
                break;
        }

        if(!$result)
            $this->endExec(400,['Método inadequado']);

        $return = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC))
        {
            $return[] = $row;
        }
        $this->endExec(200,$return);
    }

    /**
     * Método para finalizar a execução da API e retornar o HTTP Response Code devido, junto com o resultado da consulta, se necessário.
     *
     * @param int $code
     * @param string $content
     * @param string $content_type
     * @param string $log
     */
    private function endExec ($code = 400, $content = "", $content_type = "application/json", $log = "")
    {

        // Fecha a conexão com o banco.
        unset($this->bd);

        // Calcula um hash para o conteúdo (Se existir).
        if($content)
            $etag = md5(serialize($content));
        else
            $etag = FALSE;

        // Verifica se essa página já foi servida para o cliente
        if(isset($_SERVER['HTTP_IF_NONE_MATCH']) && $etag)
        {
            if (str_replace('"', '', stripslashes($_SERVER['HTTP_IF_NONE_MATCH'])) == $etag)
            {
                http_response_code('304');
                exit;
            }
        }

        // Prepara o conteúdo a ser retornado de acordo com o tipo.
        switch($content_type)
        {
            case 'application/pdf':
                header('Content-Description: File Transfer');
                header('Content-Disposition: attachment; filename=arquivo.pdf');
                break;
            case 'application/json':
                $content = $content?json_encode($content):"";
                break;
        }
        header("Content-Type: $content_type");
        if($etag)
            header("Etag: $etag");

        // Retorna o HTTP Response Code e o conteúdo (Se necessário)
        http_response_code($code);
        echo $content;

        exit;
    }
}
