echo 'Starting to Deploy...'
ssh root@194.195.113.217 "
	sudo docker info
	cd /home/ubuntu/todolist-server/config/docker
	sudo docker pull jatin510/todo-list-server:latest
   sudo docker compose down
   sudo docker compose -f docker-compose.yml up -d
   "
echo 'Deployment completed successfully'