# Exercise Tracker Microservice
### Example usage:
Responsive web app: https://yk-ex-tracker-api.glitch.me  
Test view: https://yk-ex-tracker-api.glitch.me/testview

##### Add user
* Send a POST request to `https://yk-ex-tracker-api.glitch.me/api/exercise/new-user`
  * With the following data:
        username - String (required)

##### Add exercise for a user
* Send a POST request to `https://yk-ex-tracker-api.glitch.me/api/exercise/add`
  * With the following data:
        userId - String (required)
        desc - Description as a String (required)
        dur - duration in minutes as a Number (required)
        date - Date (optional)

##### Get user list
* Send a GET request to: `https://yk-ex-tracker-api.glitch.me/api/exercise/users`

##### Get exercise log
* Send a GET request of the form: `https://yk-ex-tracker-api.glitch.me/api/exercise/log?{userId}[&from][&to][&limit]`
    * **{}** - required parameters
    * **[]** - optional parameters
    * ** from, to** - dates formatted as "yyyy-mm-dd"
    * **limit** - number

##### Get a specific exercise entry
* Send a GET request of the form: `https://yk-ex-tracker-api.glitch.me/api/exercise/entry?{exId}`
    * **{}** - required parameters

##### Edit an exercise entry
* Send a PUT request: `https://yk-ex-tracker-api.glitch.me/api/exercise/edit?{exID}{&desc}{&dur}{&date}`
    * **{}** - required parameters
    * **dur** - number
    * **date** - date formatted as "yyyy-mm-dd"

### Example output:
* After adding new user
    * {"_id":"yT9XJzFz","username":"test"}
* After adding exercise for the user with ID yT9XJzFz
    * {"description":"Jogging","duration":"30","date":"2019-10-08T00:00:00.000Z"}
* After requesting a list of users
    * [{"_id":"yT9XJzFz","username":"test"}]
* After requesting an exercise log
    * {"username":"test","count":1,"log":[{"date":"2019-10-08T00:00:00.000Z","description":"Jogging","duration":"30"}]}
