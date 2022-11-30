# Docs: Como validar autorização nas páginas next?

    Por "validar autorização", entenda-se a execução de lógica verificadora antes de permitir
    acesso a uma página com base em atributos do usuário em sessão.

    Por exemplo, tem-se a permissão de acesso através do atributo "Role": um usuário ao tentar acessar o 'dashboard administrativo' só poderá ser permitido se tiver "ADMIN" contido em seu atributo "Role".

    Esse é um exemplo de "lógica verificadora", que no contexto dessa aplicação é nomeada de 'Policy'. Atualmente a lógica expressa acima está contida na função 'allowByRole', na pasta "./utils/auth/policies", onde esta e todas as demais 'policies' devem ser registradas.

## Validando através das 'policies'

        O caminho para fazer essa validação antes do acesso as páginas é declarar, junto a página,
        a constante referente a "getServerSideProps" e atribuir como valor a função utilitária "withAuth", especificada em "./utils/auth/withAuth.ts", ela em seu fluxo de execução valida se existe um usuário em sessão (está autenticado) e executa a lógica da callback que deve ser passada como argumento, tomando conta de realizar o devido 'redirect' em caso de erro.

        Essa callback a ser passada como argumento é referente ao processamento individual para aquela página, incluindo outras ações não relacionadas a autorização mas necessárias a construção do conteúdo da página. Porém, destaca-se aqui que é nessa função que as 'policies' devem ser invocadas, funções de validação que concluirão em uma 'exception' caso a validação não seja positiva, as exceptions serão tratadas pelo helper. Importante notar que as policies a serem executadas são referenciadas a partir de um objeto "policies" exportado no arquivo encontrado em: "./utils/auth/policies/index.ts".

        Parâmetros: Essa função callback espera que dois argumentos sejam declarados, 'ctx' referente ao contexto da requisição e 'user' referente ao usuário atualmente resguardado em sessão. Ambos os objetos são passados adiante pelo 'withAuth' helper.

        Retorno: Espera-se que essa callback retorne um objeto contendo a propriedade 'props', o retorno de 'execução bem sucedida' para a função 'getServerSideProps'.

        Ex:

        ```
        export const getServerSideProps = withAuth(
        async (ctx: GetServerSidePropsContext, user: TSessionUser) => {

            // Jogará uma 'exception' caso usuário não tenha nenhuma dessas roles, o que resultará
            // em um redirect à página de login.
            await Policies.allowByRole(
                user,
                [Roles.ADMIN, Roles.DOCTOR],
                RolesCheckModeEnum.ACCEPT_ANY
            )

            return {
                props: {
                },
            }
        }
        )
        ```

## Criando uma 'Policy'

        A 'policies' devem ser criadas em "./utils/auth/policies" e posteriomente registradas no objeto agregador em "./utils/auth/policies/index".
        Os parâmetros das policies são individuais e não convencionados, porém, é frequente que o argumento referente ao usuário em sessão aparece para que se faça as devidas validações. Pode-se declarar quantos argumentos e de quais tipos forem necessários para fazer a validação, esperando que o cliente a chamar a 'policy' seja capaz de suprir a demanda.

        Quanto a retorno: espera-se que uma 'policy' lance uma exception de tipo 'AuthPolicyError' para indicar falha na validação e considere que a mensagem obrigatória acoplada à exception será renderizada na página de login para informar as deficiências do usuário atual, portanto deve ser suficientemente instrutiva.
