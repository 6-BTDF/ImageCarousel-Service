arangoimport --file "userData.csv" --type csv --collection "users" --create-collection true --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "listData.csv" --type csv --collection "favorite_lists" --create-collection true --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "edgeListToListingData.json" --type json --collection "listToListingsEdges" --create-collection true --create-collection-type edge --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "edgeUserToListData.json" --type json --collection "userToListsEdges" --create-collection true --create-collection-type edge --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "listingDetailsData.json" --type json --collection "listings" --create-collection true --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

##On instance remove threads and batch size

arangoimport --file "userData.csv" --type csv --collection "users" --create-collection true --server.database "airbnb";

arangoimport --file "listData.csv" --type csv --collection "favorite_lists" --create-collection true --server.database "airbnb";

arangoimport --file "edgeListToListingData.json" --type json --collection "listToListingsEdges" --create-collection true --create-collection-type edge --server.database "airbnb";

arangoimport --file "edgeUserToListData.json" --type json --collection "userToListsEdges" --create-collection true --create-collection-type edge --server.database "airbnb";

arangoimport --file "listingDetailsData.json" --type json --collection "listings" --create-collection true --server.database "airbnb";

## see size stats on EC2
df -h

sudo arangod --server.endpoint tcp://0.0.0.0:8529

### One mil

arangoimport --file "listingDetailsOneM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsTwoM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsThreeM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsFiveM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsSevenM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsEightM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsNineM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";

arangoimport --file "listingDetailsTenM.json" --type json --collection "listings" --create-collection true --batch-size 1000000 --progress true --threads 1 --server.database "airbnb";