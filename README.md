MailChimp only accepts JSON objects for he body.

Here's a quick look at the JSON format in POST and PATCH requests.

{
  "name": "Freddie's Favorite Hats",
  "contact": {
    "company": "Mailchimp",
    "address1": "675 Ponce De Leon Ave NE",
    "address2": "Suite 5000",
    "city": "Atlanta",
    "state": "GA",
    "zip": "30308",
    "country": "US",
    "phone": ""
  },
  "permission_reminder": "You're receiving this email because you signed up for updates about Freddie's newest hats.",
  "campaign_defaults": {
    "from_name": "Freddie",
    "from_email": "freddie@freddiehats.com",
    "subject": "",
    "language": "en"
  },
  "email_type_option": true
}

