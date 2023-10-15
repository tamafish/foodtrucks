# foodtrucks
A simple demo to display food trucks

## How to Use
1. make sure node installed, check: (```node -v```)
2. (```cd frontend```), run (```npm install```), then (```npm start```)
3. (```cd backend```), run (```npm install```), then (```npm start```)
4. access http://localhost:3000/

## Description
This is a simple full-stack app implemented with React & NodeJs
Basic idea is backend read data from csv and return in JSON format
frontend display filtered data:
* Food trucks are not expired
* Food trucks name, food supplied, schedule, status("Available" -> "APPROVED","Coming soon" -> "REQUESTED")
* filter: status
* search: food truck name or food items key words

## To Be Refined
* Repalce static csv reading with real-time parsing from webaddress or dump into database with scheduled job
* More information to display, more filtering, elegant layout
* More options for users like request new food trucks registration, issue report, food trucks rating,etc.
