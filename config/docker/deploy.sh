echo 'Starting to Deploy...'
ssh ubuntu@3.109.52.163 "
	sudo docker info
	cd /home/ubuntu/todolist-server/config/docker
	sudo docker pull docker pull jatin510/todo-list-server:latest
   sudo docker-compose down
   sudo docker-compose -f docker-compose.dev.yml up -d
   "
echo 'Deployment completed successfully'