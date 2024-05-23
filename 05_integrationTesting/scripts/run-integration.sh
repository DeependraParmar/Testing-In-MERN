docker-compose up -d
echo "🟡 Waiting for the database to start"
./scripts/wait-for-it.sh "postgresql://postgres:mysupersecretpassword@localhost:5432/postgres" --
echo "🟢 Database is ready & up"
npx prisma migrate dev --name init
npm run test
docker-compose down 
echo "🔵 Process complete and auxillaries turned down"

