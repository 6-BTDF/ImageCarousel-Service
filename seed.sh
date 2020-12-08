arangoimport --file "./db/data/userData.csv" --type csv --collection "users" --server.database "airbnb";

arangoimport --file "./db/data/listData.csv" --type csv --collection "favorite_lists" --server.database "airbnb";

arangoimport --file "./db/data/listingDetailsData.csv" --type csv --collection "listings" --server.database "airbnb";

arangoimport --file "./db/data/listListingEdgeData.csv" --type csv --collection "listToListingsEdges" --server.database "airbnb";

arangoimport --file "./db/data/userListEdgeData.csv" --type csv --collection "userToListEdges" --server.database "airbnb";
