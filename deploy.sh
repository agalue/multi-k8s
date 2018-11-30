#!/bin/bash

CLIENT_IMG=agalue/poc-multi-client
SERVER_IMG=agalue/poc-multi-server
WORKER_IMG=agalue/poc-multi-worker

docker build -t $CLIENT_IMG:latest -t $CLIENT_IMG:$SHA -f ./client/Dockerfile ./client
docker build -t $SERVER_IMG:latest -t $SERVER_IMG:$SHA -f ./server/Dockerfile ./server
docker build -t $WORKER_IMG:latest -t $WORKER_IMG:$SHA -f ./worker/Dockerfile ./worker

docker push $CLIENT_IMG:latest
docker push $SERVER_IMG:latest
docker push $WORKER_IMG:latest

docker push $CLIENT_IMG:$SHA
docker push $SERVER_IMG:$SHA
docker push $WORKER_IMG:$SHA

kubectl apply -f ./k8s

kubectl set image deployments/server-deployment server=$SERVER_IMG:$SHA
kubectl set image deployments/client-deployment client=$CLIENT_IMG:$SHA
kubectl set image deployments/worker-deployment worker=$WORKER_IMG:$SHA
