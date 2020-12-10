arangoimport --file "userData.csv" --type csv --collection "users" --create-collection true --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "listData.csv" --type csv --collection "favorite_lists" --create-collection true --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "edgeListToListingData.json" --type json --collection "listToListingsEdges" --create-collection true --create-collection-type edge --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "edgeUserToListData.json" --type json --collection "userToListsEdges" --create-collection true --create-collection-type edge --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

arangoimport --file "listingDetailsData.json" --type json --collection "listings" --create-collection true --batch-size 33554432 --progress true --threads 4 --server.database "airbnb";

