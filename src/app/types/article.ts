export class Article {
    id: number;
    category = '';
    subcategory = '';
    zustand = '';
    title = '';
    description = '';
    urls = '';
    userId = '';
    price: number;
    priceStatus = '';
    locationNames: string[];
    distance: number;
    date: Date = new Date();
    views: number;
    location: Location;
    bookmarks: number;
    pictureIds: [string];
    uri = '';
}

export class Location {
  type: any;
  coordinates: [number, number];
}


/*{
    "id" : 6769,
    "title" : "pilz",
    "description" : "Wald",
    "urls" : "6770,6771,6774",
    "userId" : "10208246429418599",
    "price" : 126.0,
    "locationName" : "",
    "distance" : 82,
    "date" : 1569875538809,
    "views" : 49,
    "location" : {
      "type" : "Point",
      "coordinates" : [ 54.086546299999995, 13.3923414 ]
    },
    "bookmarks" : 0,
    "pictureIds" : [ "6770", "6771", "6774" ]
  }*/
