# CUSTOMER MANAGEMENT API DOCUMENTATION
This API is built on REST; data entities are represented as HTTP resources and are assessed using HTTP verbs, mainly GET, POST, PATCH and DELETE. The request parameters and responses are encoded in JSON. The response status and error codes comply with HTTP status codes as defined in RFC 2616. The API endpoints can be invoked using postman and command line tools like Node.js. Any code sample provided is written in Node.js.

## GETTING STARTED
To get started you may clone this repository and run `npm install` to install the needed dependencies. Create an environment file (.env) that may be populated with values as directed by the env.example file. You should be able to run the app by running `npm run dev` on the terminal.

There are three APIs associated with customer management so far; 
**Uploading contacts**
**Sending texts**
**Sending emails**

#### UPLOADING CONTACTS

We will be using the endpoint : **localhost:port/apiVersion/upload/merchant_id**. 
In Postman, use form-data in body to write your payload as we will be uploading a csv file with the contact details. The payload is in the format:
```
{
group_id: electronics,
csvFile: upload your csv here
}
```
Your csv file should be in the format:
| Name  | Phone | Email |
| ------------- | ------------- | ------------- |
| Person 1  | 254712345678  | person1@gmail.com |
| Person 2  | 254791234567  | person2@hotmail.com |

**Expected response:** Contacts have successfully been uploaded

#### SENDING TEXTS

We will be using the endpoint: **localhost:port/apiVersion/notification/sms/group_id**.
In Postman, use raw in body to write your payload. The payload will be in the format:
```
{
	“merchant_id”: “julla”,
	“message”: “whatever text you intend to send.”
}
```
**Expected response:**
``` 
{
    "status": "200",
    "message": {
        "id": "ckavik07l00007mhqezsn9s02",
        "group_id": "electronics",
        "merchant_id": "julla",
        "message": "Message to be sent",
        "initiated_on": 1590956723217
    }
}
 ```

#### SENDING EMAILS

The endpoint will look like:  **localhost:port/apiVersion/notification/email/group_id**.
While in Postman use raw in body to write your payload which should be in the format:
```
{
	"merchant_id": “julla”,
	"merchant_email": "verified email that merchant wants to send with",
	"subject": "subject of the email",
	"message": "Message to be sent"
}
```
**Expected response:**
```
{
    "status": "200",
    "message": {
        "id": "ckavik07l00007mhqezsn9s02",
        "group_id": "electronics",
        "merchant_id": "julla",
        "merchant_email": "verified email that merchant wants to send with",
        "message": "Message to be sent",
        "subject": "subject of the email",
        "initiated_on": 1590956723217
    }
}
```