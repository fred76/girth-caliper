

IN SERVER FOLDER

1)
 
CREATE .env FILE with following key

STRIPE_SECRET_KEY="sk_test_ YOUR KEY"
STRIPE_PUBLIC_KEY="pk_test_ YOUR KEY"
SERVICE_ACCOUNT_FILE_NAME="YOUR GOOGLE SERVICE ACCOUNT.json"
PROJECT_ID="girthcalipertest"
FIRESTORE_DATABASE_URL="https://girthcalipertest.firebaseio.com",
STRIPE_WEBHOOK_SECRET="whsec_YOUR KEY"
STRIPE_WEBHOOK_SECRET_CONNECTED="whsec_YOUR KEY"
STRIPE_CLIENT_ID_CONNECT_TEST="YOUR STRIPE CLIENT ID" 

2)

FOR SERVICE GOOGLE ACCOUNT CREATE A FOLDER service-accounts
INSIDE service-accounts FOLDER save the json file created from google service account page.

