# Exercise Tracker Microservice
### Example usage:
https://yk-ex-tracker-api.glitch.me
##### Add user
* Send a POST request to `https://yk-url-shorten-api.glitch.me/api/exercise/new-user`
  * With the following data:
        username - String (required)

##### Add exercise for a user
* Send a POST request to `https://yk-url-shorten-api.glitch.me/api/exercise/add`
  * With the following data:
        userId - String (required)
        desc - Description as a String (required)
        dur - duration in minutes as a Number (required)
        date - Date (optional)

##### Get exercise log
* Send a GET request of the form: `https://yk-url-shorten-api.glitch.me/api/exercise/log?{userId}[&from][&to][&limit]`
    * **{}** - required parameters
    * **[]** - optional parameters
    * ** from, to** - dates formatted as "yyyy-mm-dd"
    * **limit** - number
### Example output:
* After adding new user
    * {"_id":"yT9XJzFz","username":"test"}
* After adding exercise for the user with ID yT9XJzFz
    * {"description":"Jogging","duration":"30","date":"2019-10-08T00:00:00.000Z"}
* After requesting a list of users
    * [{"_id":"yT9XJzFz","username":"test"}]
* After requesting an exercise log
    * {"username":"test","count":1,"log":[{"date":"2019-10-08T00:00:00.000Z","description":"Jogging","duration":"30"}]}