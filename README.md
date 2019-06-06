# JWT Asymmetric Demo

A demonstration of an auth service signing a jwt using a private key, and an external service verifying that token with the corresponding public key.

## Running the demo

Generate public/private key. Give private key to auth service and public key to external service.

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f keypair.key -N '' && \
openssl rsa -in keypair.key -pubout -outform PEM -out keypair.key.pub && \
cat keypair.key && \
cat keypair.key.pub && \
mv keypair.key auth-service/private.key && \
mv keypair.key.pub external-service/public.key.pub
```

(In a new terminal) Start the auth service (port 3000) 

```bash
cd auth-service && npm install && npm start
```

(In a new terminal) Start the external service (port 3001)

```bash
cd external-service && npm install && npm start
```

You can either import the postman collection at `postman_collection.json` and run "Auth" then "External Resource"

or you can do it manually with `curl`

Make a request to the auth service to get a token:

```bash
curl -X POST \
  http://localhost:3000/auth \
  -H 'Content-Type: application/json' \
  -d '{
	"username": "raddeus",
	"password": "password"
}'
```

Replace `{TOKEN}` with the `token` key of the response. Make a request to the external service with the JWT:

```bash
curl -X GET \
  http://localhost:3001 \
  -H 'Authorization: Bearer {TOKEN}'
```

You should see that the external service validated the key that your auth service signed, without communicating with it.