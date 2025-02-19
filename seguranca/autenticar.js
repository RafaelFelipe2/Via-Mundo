//três parâmetros:
// requisicao, resposta, next (prosseguir)
// os parâmetros são fornecidos automaticamente pelo express
export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.autenticado === true){
        next();
    } else {
        resposta.redirect('/login');
    }
}