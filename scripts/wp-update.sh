
echo "Installing Napa..."
# install napa
npm install

# install and move wordpress
echo "Updating WordPress..."

napa WordPress/WordPress
rsync -dr node_modules/WordPress/* .
rm -rf node_modules/WordPress
