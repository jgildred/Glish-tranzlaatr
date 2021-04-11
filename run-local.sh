
exec pkill -f 'node'
sleep 1
exec npx @google-cloud/functions-framework @google-cloud/language --target=main