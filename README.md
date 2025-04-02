# Send Mail

This endpoint allows you to send an email.
## Inicialização do Docker Compose

## Visão Geral
Este `docker-compose.yml` define dois serviços:

1. **MailHog** - Um servidor SMTP para captura de e-mails enviados durante o desenvolvimento.
2. **Mailer Service** - Um serviço personalizado para envio de e-mails, configurado para usar o MailHog como servidor SMTP.

## Requisitos
Antes de iniciar os contêineres, certifique-se de que possui:
- **Docker** instalado ([Instalar Docker](https://docs.docker.com/get-docker/))
- **Docker Compose** instalado ([Instalar Docker Compose](https://docs.docker.com/compose/install/))

## Estrutura do Arquivo `docker-compose.yml`
```yaml
services:
  mailhog:
    image: mailhog/mailhog
    restart: always
    ports:
      - "1025:1025"  # Porta SMTP
      - "8025:8025"  # Interface web

  mailer_service:
    container_name: mailerservice
    build:
      dockerfile: ./Dockerfile
    ports:
      - "30123:3000"  # Porta da aplicação
    restart: always
    depends_on:
      - mailhog
    environment:
      - SMTP_HOST=mailhog
      - SMTP_PORT=1025
```

## Instruções de Uso
### 1. Construir e Iniciar os Contêineres
Execute o seguinte comando no diretório onde está localizado o `docker-compose.yml`:
```sh
docker-compose up --build -d
```
O `-d` faz com que os contêineres rodem em segundo plano.

### 2. Acessar a Interface Web do MailHog
Abra seu navegador e acesse:
```
http://localhost:8025
```
Aqui você poderá visualizar os e-mails capturados pelo MailHog.

### 3. Testar o Serviço de E-mail
Para testar o envio de e-mails a partir do `mailer_service`, certifique-se de que ele está configurado para usar as seguintes credenciais SMTP:
- **Host:** `mailhog`
- **Porta:** `1025`
- **Usuário/Senha:** Não é necessário (MailHog não requer autenticação)

Se o `mailer_service` estiver configurado corretamente, os e-mails enviados aparecerão na interface web do MailHog.

### 4. Parar os Contêineres
Caso precise parar os contêineres, utilize:
```sh
docker-compose down
```
Isso removerá os contêineres, mas manterá os volumes e redes criadas.

## Solução de Problemas
- Se o MailHog não estiver acessível na porta `8025`, verifique se não há outro serviço em execução na mesma porta.
- Para visualizar logs de um contêiner específico, use:
  ```sh
  docker logs -f mailerservice
  ```
- Se precisar reiniciar um contêiner, execute:
  ```sh
  docker-compose restart mailerservice
  ```
### Request

- Method: `POST`
    
- URL: `{{host}}/send-mail`
    
- Headers:
    
    - Content-Type: `application/json`
        
- { "from": "string", "to": "string", "subject": "string", "body": "string" }
    

| Parameter | Type | Description |
| --- | --- | --- |
| from | string | The email address of the sender |
| to | string | The email address of the recipient |
| subject | string | The subject of the email |
| body | string | The content of the email |

### Response

The response will be a JSON object with the following schema:

``` json
{
    "message": "string"
}

 ```

| Key | Type | Description |
| --- | --- | --- |
| status | string | The status of the email sending process |
| message | string | A message regarding the email sending process |

## Conclusão
Esse serviço permite desenvolver e testar funcionalidades de envio de e-mails sem depender de um servidor SMTP real, garantindo mais controle e facilidade no debugging.
