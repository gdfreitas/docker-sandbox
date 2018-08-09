import psycopg2
from bottle import route, run, request

DSN = 'dbname=email_sender user=postgres host=db'
SQL = 'INSERT INTO emails (assunto, mensagem) VALUES (%s, %s)'

def register_message(assunto, mensagem):
   connection = psycopg2.connect(DSN)
   cursor = connection.cursor()
   cursor.execute(SQL, (assunto, mensagem))
   connection.commit();
   cursor.close();
   connection.close()
   
   print('Mensagem registrada!')

@route('/', method='POST')
def send():
   assunto = request.forms.get('assunto')
   mensagem = request.forms.get('mensagem')

   register_message(assunto, mensagem)

   return 'Mensagem enfileirada ! Assunto: {} Mensagem: {}'.format(assunto, mensagem)

if __name__ == '__main__':
   run(host='0.0.0.0', port=8080, debug=True)